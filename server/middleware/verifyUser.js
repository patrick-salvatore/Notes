const keys = require('../config/config'),
    jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, keys.secretOrPrivateKey);
        req.user = decode;
        next();
    } catch {
        return res.status(401).json({
            msg: 'Unable to authorize request'
        })
    }
}