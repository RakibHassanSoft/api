const jwt = require('jsonwebtoken');
const createError = require('../utils/createError');

const verifyToken = (req, res, next) => {
    try {
        //const token = req.cookies.accessToken;
        const token = req.headers.authorization; // Access headers using req.headers.authorization
        if (!token) next (createError(401, 'Authentication Failed'));

        jwt.verify(token, 'ABCD', async (err, payload) => {
            if (err) next (createError(403, 'Token is not valid'));
            req.userId = payload.id;
            req.isSeller = payload.isSeller;
            next();
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

module.exports = verifyToken;

