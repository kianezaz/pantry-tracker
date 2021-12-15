const jwt = require("jsonwebtoken");
const User = require("../models/user");

function verifyToken(req, res, next) {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ 
            isLoggedIn: false,
            message: "No token provided"
         });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ 
                isLoggedIn: false,
                message: "Unauthorized"
             });
        }
        req.userId = decoded.id
        next();
    });
}

module.exports = verifyToken;