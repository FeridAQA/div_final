const jwt = require("jsonwebtoken");
const config = require("../config");

const encodePayload = (payload) => {
    return jwt.sign(payload, config.jwtSecret, { expiresIn: '3h' });
};

const decodePayload = (token) => {
    try {
        const payload = jwt.verify(token, config.jwtSecret);
        return payload;
    } catch (error) {
        return false;
    }
};

module.exports = {
    encodePayload,
    decodePayload,
};