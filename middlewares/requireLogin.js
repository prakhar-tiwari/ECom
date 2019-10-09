const jwt = require('jsonwebtoken');
const keys = require('../utils/keys').secretOrKey;

module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        if (!req.user) {
            return res.status(401).json({ message: 'You must log in !' });
        }
        next();
        return;
    }

    try {
        const jwtToken = token.substring(7);
        const decoded = jwt.verify(jwtToken, keys);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ message: 'You must log in' });
    }
}