// File: app.js (All-in-one version)

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory data store
let items = [
    { id: 1, name: "Laptop", description: "A high-performance laptop." },
    { id: 2, name: "Keyboard", description: "A mechanical keyboard." }
];

// --- ROUTES ---

// Root route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// GET /items - Retrieve all items
app.get('/items', (req, res) => {
    res.json(items);
});

// GET /items/:id - Retrieve a single item by ID
app.get('/items/:id', (req, res, next) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) {
        const error = new Error('Item not found');
        error.status = 404;
        return next(error);
    }
    res.json(item);
});

// POST /items - Create a new item
app.post('/items', (req, res, next) => {
    const { name, description } = req.body;
    if (!name || !description) {
        const error = new Error('Name and description are required.');
        error.status = 400;
        return next(error);
    }
    const newItem = {
        id: items.length ? items[items.length - 1].id + 1 : 1,
        name,
        description
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// PUT /items/:id - Update an item
app.put('/items/:id', (req, res, next) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) {
        const error = new Error('Item not found');
        error.status = 404;
        return next(error);
    }
    item.name = req.body.name || item.name;
    item.description = req.body.description || item.description;
    res.json(item);
});

// DELETE /items/:id - Delete an item
app.delete('/items/:id', (req, res, next) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) {
        const error = new Error('Item not found');
        error.status = 404;
        return next(error);
    }
    items.splice(itemIndex, 1);
    res.status(204).send();
});


// --- ERROR HANDLING ---

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Something went wrong!'
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});