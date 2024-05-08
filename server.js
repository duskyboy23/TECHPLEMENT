// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = 'mongodb://localhost:27017/quotesDB';

// Models
const Quote = require('./models/Quote');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
const quotesRoutes = require('./routes/quotes');
app.use('/api/quotes', quotesRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
