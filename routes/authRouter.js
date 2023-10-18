const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Define the register function as the callback for the POST route
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;
