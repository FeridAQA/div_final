const { findUserById, find_user_by_Id } = require("../services/user.service");
const { decodePayload } = require("../utils/jwt");

const authMiddleware = async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token?.includes("Bearer")) {
        return res.status(401).json({ message: "Token is not defined" });
    }

    token = token.split(" ")[1];

    const result = decodePayload(token);
    if (!result) {
        return res.status(401).json({ message: "Invalid token ferid" });
    }
    // console.log('result====>',result);


    let user = await find_user_by_Id(result.user_id)

    if (!user) {
        return res.status(404).json({ message: "User is not found" });
    }
    user._id = user._id.toString();
    req.user = user;

    next();
}

module.exports = {
    authMiddleware,
};


