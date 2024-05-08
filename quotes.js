// routes/quotes.js
const express = require('express');
const router = express.Router();

const Quote = require('../models/Quote');

// Get random quote
router.get('/random', async (req, res) => {
  try {
    const count = await Quote.countDocuments();
    const random = Math.floor(Math.random() * count);
    const quote = await Quote.findOne().skip(random);
    res.json(quote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new quote
router.post('/', async (req, res) => {
  const quote = new Quote({
    text: req.body.text,
    author: req.body.author
  });

  try {
    const newQuote = await quote.save();
    res.status(201).json(newQuote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Other CRUD operations (update, delete) can be added similarly

module.exports = router;
