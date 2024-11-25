const express = require('express');
const Opinion = require('../models/Opinion');

const router = express.Router();

// Get all opinions
router.get('/', async (req, res) => {
    try {
        const opinions = await Opinion.find().sort({ createdAt: -1 });
        res.json(opinions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Post a new opinion
router.post('/', async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Opinion text is required' });

    try {
        const newOpinion = new Opinion({ text });
        const savedOpinion = await newOpinion.save();
        res.status(201).json(savedOpinion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
