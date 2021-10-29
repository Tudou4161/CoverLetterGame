const jwt = require("jsonwebtoken");
const config = require("../config");


const verifyToken = (req, res, next) => {
    
    if (!req.cookies.user) {
        return res.status(417).json({
            code: 417,
            message: "you need login",
            detail: err
        });
    }

    try {
        req.decoded = jwt.verify(req.cookies.user, config.JWT_SECRET);
        return next();

    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(419).json({
                code: 419,
                message: "already expired token. you need login again",
            });
        }
        return res.status(401).json({
            code: 401,
            message: "invalid token",
        });
    };
};

module.exports = {
    verifyToken
}