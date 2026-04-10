require('dotenv').config();
const { MongoClient } = require('mongodb');

// Fallback to local if env is missing
const url = process.env.MONGO_URL;

let dbInstance = null;
const dbName = "footprintdb";

async function connectToDatabase() {
    // If we already have a connection, return it immediately, ensures that your app doesn't open a brand new connection every time someone hits an endpoint
    if (dbInstance) {
        return dbInstance;
    }

    try {
        const client = new MongoClient(url);

        // Task 1: Connect to MongoDB
        await client.connect();
        console.log("Successfully connected to MongoDB server");

        // Task 2: Connect to database footprintdb and store in variable dbInstance
        dbInstance = client.db(dbName);

        // Task 3: Return database instance
        return dbInstance;
    } catch (error) {
        console.error("Failed to connect to the database:", error.message);
        throw error;
    }
}

module.exports = connectToDatabase;