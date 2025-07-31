// File: /routes/items.js

const express = require('express');
const router = express.Router();

// In-memory data store (as required by the project)
let items = [
    { id: 1, name: "Laptop", description: "A high-performance laptop for development." },
    { id: 2, name: "Keyboard", description: "A mechanical keyboard with RGB lighting." },
    { id: 3, name: "Mouse", description: "An ergonomic wireless mouse." }
];

// --- CRUD Routes ---

// GET /items - Retrieve all items
router.get('/', (req, res) => {
    res.json(items);
});

// GET /items/:id - Retrieve a single item by ID
router.get('/:id', (req, res, next) => {
    const item = items.find(i => i.id === parseInt(req.params.id));

    if (!item) {
        const error = new Error('Item not found');
        error.status = 404;
        return next(error); // Pass the error to the global error handler
    }

    res.json(item);
});

// POST /items - Create a new item
router.post('/', (req, res, next) => {
    const { name, description } = req.body;

    // Basic validation
    if (!name || !description) {
        const error = new Error('Name and description are required.');
        error.status = 400;
        return next(error);
    }

    const newItem = {
        id: items.length ? items[items.length - 1].id + 1 : 1, // Generate a new unique ID
        name,
        description
    };

    items.push(newItem);
    res.status(201).json(newItem); // 201 Created status
});

// PUT /items/:id - Update an item by ID
router.put('/:id', (req, res, next) => {
    const item = items.find(i => i.id === parseInt(req.params.id));

    if (!item) {
        const error = new Error('Item not found');
        error.status = 404;
        return next(error);
    }

    const { name, description } = req.body;
    
    // Update fields if they are provided
    if (name) item.name = name;
    if (description) item.description = description;

    res.json(item);
});

// DELETE /items/:id - Delete an item by ID
router.delete('/:id', (req, res, next) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));

    if (itemIndex === -1) {
        const error = new Error('Item not found');
        error.status = 404;
        return next(error);
    }

    items.splice(itemIndex, 1); // Remove the item from the array
    res.status(204).send(); // 204 No Content
});

module.exports = router;