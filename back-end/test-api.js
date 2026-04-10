const API_BASE = "http://localhost:3060/api/auth";

const testUser = {
    email: "kopano.mosai@gmail.com",
    password: "Mosai12345"
};

const testLog = {
    userId: "user_101",
    activity: "Bus",
    category: "Transport",
    value: 12,
    unit: "km",
    co2: 0.85,
    date: new Date().toISOString()
};

async function runTest() {
    console.log("🚀 Starting API Test...");

    try {
        // --- TEST 1: REGISTER ---
        console.log("\n1. Testing Registration...");
        const regRes = await fetch(`${API_BASE}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(testUser)
        });
        const regData = await regRes.json();

        if (regRes.ok) {
            console.log("✅ Registration Successful:", regData);
        } else {
            console.log("⚠️ Registration Note:", regData.error || "User might already exist");
        }

        // --- TEST 2: LOGIN ---
        console.log("\n2. Testing Login...");
        const loginRes = await fetch(`${API_BASE}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(testUser)
        });
        const loginData = await loginRes.json();

        if (loginRes.ok) {
            console.log("✅ Login Successful! Welcome back:", loginData.user.email);
            console.log("User ID from DB:", loginData.user.id);
        } else {
            console.log("❌ Login Failed:", loginData.error);
        }

        // --- TEST 3: LOG FOOTPRINT ---
        // console.log("\n3. Testing Footprint Log...");
        // const response = await fetch("http://localhost:3060/api/logs", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(testLog)
        // });

        // const data = await response.json();

        // if (response.ok) {
        //     console.log("✅ Success! Log saved to MongoDB.");
        //     console.log("Response from Server:", data);
        // } else {
        //     console.log("❌ Failed:", data.error);
        // }
    } catch (error) {
        console.error("❌ Connection Error: Is your server running on port 3060?", error.message);
    }
}

runTest();