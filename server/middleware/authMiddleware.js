import jwt from "jsonwebtoken"
import User from "../models/User.js";

const protectAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized"
            })
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from token
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized, user not found',
            });
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        console.log("Error validating token:", error.message)
        res.status(401).json({
            success: false,
            message: "Token failed"
        })
    }
}

export default protectAuth;
