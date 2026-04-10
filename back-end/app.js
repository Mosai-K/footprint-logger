/*jshint esversion: 8 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pinoLogger = require('./logger');
const connectToDatabase = require('./models/db')
const footprintRoutes = require('./routes/footprintRoute');

const app = express();
app.use(cors()); // Allow all origins for your capstone
const port = 3060;

// Connect to MongoDB
connectToDatabase().then(() => {
    pinoLogger.info('Connected to DB');
}).catch((e) => console.error('Failed to connect to DB', e));

app.use(express.json());
app.use('/api', footprintRoutes);

const pinoHttp = require('pino-http');
const logger = require('./logger');
app.use(pinoHttp({ logger }));

// Global Error Handler
app.use((err, req, res, next) => {
    pinoLogger.error(err);
    res.status(500).send('Internal Server Error');
});

app.get("/", (req, res) => {
    res.send("Inside the server");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});