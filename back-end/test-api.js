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
        const response = await fetch("http://localhost:3060/api/logs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(testLog)
        });

        const data = await response.json();

        if (response.ok) {
            console.log("✅ Success! Log saved to MongoDB.");
            console.log("Response from Server:", data);
        } else {
            console.log("❌ Failed:", data.error);
        }
    } catch (error) {
        console.error("❌ Connection Error: Is your server running on port 3060?", error.message);
    }
}

runTest();