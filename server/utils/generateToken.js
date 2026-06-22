import jwt from "jsonwebtoken";
import dotenv from "dotenv/config"

const generateToken = (userId) => {
    return jwt.sign({ userId: userId.toString() }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    })
};

export default generateToken;
