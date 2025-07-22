// routes/registerRoutes.js
const express = require('express');
const router = express.Router();
const { registerStudent } = require('../controllers/registerController');

// POST route for student registration
router.post('/register', registerStudent);

module.exports = router;
