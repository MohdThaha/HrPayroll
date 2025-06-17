// authMiddleware.js

function verifyToken(req, res, next) {
    // Extract token from Authorization header
    const bearerHeader = req.headers['authorization'];
    
    if (typeof bearerHeader !== 'undefined') {
        // Split the header into parts
        const bearerToken = bearerHeader.split(' ')[1];
        // console.log(bearerToken)
        
        req.token = bearerToken; // Set the token in the request object
        next();
    } else {
        // If there is no token, return a 403 Forbidden response
        res.sendStatus(403);
    }
}

module.exports = { verifyToken };
