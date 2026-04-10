require('dotenv').config();
const { MongoClient } = require('mongodb'); // Modern destructuring
const fs = require('fs');

// Environment variables
const url = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/footprintdb';
const filename = `${__dirname}/footprint.json`;
const dbName = 'footprintdb';
const collectionName = 'footprints';

async function loadData() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Optimization: Use countDocuments instead of loading all docs into memory
        const count = await collection.countDocuments();

        if (count === 0) {
            // Read and parse the file
            const rawData = JSON.parse(fs.readFileSync(filename, 'utf8'));

            // Note: Using .docs because your specific JSON structure has a "docs" wrapper
            const docsToInsert = rawData.docs;

            if (docsToInsert && docsToInsert.length > 0) {
                const insertResult = await collection.insertMany(docsToInsert);
                console.log(`Successfully seeded ${insertResult.insertedCount} documents.`);
            } else {
                console.log("No documents found in the 'docs' array to insert.");
            }
        } else {
            console.log(`Database already contains ${count} documents. Skipping seed.`);
        }
    } catch (err) {
        console.error("Error during seeding:", err.message);
    } finally {
        await client.close();
    }
}

// Only run if this file is executed directly (not when imported elsewhere)
if (require.main === module) {
    loadData();
}

module.exports = { loadData };