const express = require('express');
const userController = require('../controllers/userController');
const verifyToken = require('../middlewere/jwt'); // Corrected middleware import
const router = express.Router();

// Define the register function as the callback for the POST route
router.delete('/:id',verifyToken, userController.deleteUser);
router.get('/:id',verifyToken, userController.getUser);

module.exports = router;
