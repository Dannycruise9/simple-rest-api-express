// File: app.js

const express = require('express');
const app = express();
const itemsRoutes = require('./items'); // Correctly import the routes

const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Use the items routes for any requests to /items
app.use('/items', itemsRoutes);

// 404 Handler for undefined routes
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    // Use the error's status code or default to 500
    res.status(err.status || 500).json({
        error: err.message || 'Something went wrong!'
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
