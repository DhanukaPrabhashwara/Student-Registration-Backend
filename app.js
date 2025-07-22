// app.js
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const registerRoutes = require('./routes/registerRoutes');

// Middleware
app.use(bodyParser.json());  // To parse incoming JSON data

// Register API route
app.use('/api', registerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
