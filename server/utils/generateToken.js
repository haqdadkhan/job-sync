import jwt from "jsonwebtoken";
import dotenv from "dotenv/config"

const generateToken = (userId) => {
    return jwt.sign({ id: userId.toString() }, process.env.JWT_SECRET, {
        expiresIn: "5m"
    })
};

export default generateToken;
