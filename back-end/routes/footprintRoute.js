const express = require('express');
const router = express.Router();
const connectToDatabase = require('./db');

// --- AUTH ROUTES ---

// Register
router.post("/auth/register", async (req, res) => {
    const { email, password } = req.body;
    const db = await connectToDatabase();
    const users = db.collection("users");

    const existingUser = await users.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
    }

    const result = await users.insertOne({ email, password, createdAt: new Date() });
    res.json({ user: { id: result.insertedId, email } });
});

// Login
router.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const db = await connectToDatabase();
    const user = await db.collection("users").findOne({ email, password });

    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({ user: { id: user._id, email: user.email } });
});

// --- LOG/FOOTPRINT ROUTES ---

// Get User Logs
router.get("/logs/:userId", async (req, res) => {
    const db = await connectToDatabase();
    const userLogs = await db.collection("footprints")
        .find({ userId: req.params.userId })
        .sort({ date: -1 })
        .toArray();
    res.json(userLogs);
});

// Add New Log
router.post("/logs", async (req, res) => {
    try {
        const { userId, activity, category, value, co2, date } = req.body;
        const db = await connectToDatabase();

        const newLog = {
            userId,
            timestamp: date || new Date().toISOString(),
            category: category,
            activityType: activity,
            value: value,
            unit: req.body.unit || "unit",
            carbonImpact: co2
        };

        const result = await db.collection("footprints").insertOne(newLog);

        res.json({
            ...newLog,
            id: result.insertedId,
            co2: newLog.carbonImpact
        });

    } catch (e) {
        res.status(500).json({ error: "Failed to save log", message: e.message });
    }
});

// Delete Log
router.delete("/logs/:id", async (req, res) => {
    const db = await connectToDatabase();
    await db.collection("footprints").deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ success: true });
});

// Community Average
router.get("/community/average", async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("footprints");

        const stats = await collection.aggregate([
            // Stage 1: Filter out any docs that don't have a value
            { $match: { carbonImpact: { $exists: true } } },

            // Stage 2: Group and Calculate
            {
                $group: {
                    _id: null,
                    totalCarbon: { $sum: "$carbonImpact" }, // Changed from $co2 to $carbonImpact
                    uniqueUsers: { $addToSet: "$userId" }
                }
            },

            // Stage 3: Format the output
            {
                $project: {
                    average: {
                        $cond: [
                            { $eq: [{ $size: "$uniqueUsers" }, 0] },
                            0,
                            { $divide: ["$totalCarbon", { $size: "$uniqueUsers" }] }
                        ]
                    }
                }
            }
        ]).toArray();

        res.json({ average: stats.length > 0 ? stats[0].average : 0 });
    } catch (e) {
        res.status(500).json({ error: "Aggregation failed", message: e.message });
    }
});

// GET all footprints for a specific user
router.get('/user/:userId', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("footprints");

        // Find all logs for the user, sorted by most recent
        const footprints = await collection.find({ userId: req.params.userId })
            .sort({ timestamp: -1 })
            .toArray();

        res.status(200).json(footprints);
    } catch (e) {
        res.status(500).json({ error: "Error fetching footprints", message: e.message });
    }
});

// POST a new footprint - duplicate
router.post('/add', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("footprints");

        const newFootprint = {
            userId: req.body.userId,
            timestamp: new Date().toISOString(),
            category: req.body.category,
            activityType: req.body.activityType,
            value: req.body.value,
            unit: req.body.unit,
            carbonImpact: req.body.carbonImpact
        };

        const result = await collection.insertOne(newFootprint);

        // Log the action to your 'logs' collection automatically
        const logCollection = db.collection("logs");
        await logCollection.insertOne({
            action: "ENTRY_CREATED",
            targetId: result.insertedId,
            timestamp: new Date()
        });

        res.status(201).json(result);
    } catch (e) {
        res.status(500).json({ error: "Failed to add footprint" });
    }
});

module.exports = router;