import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

//! register
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                status: false,
                message: "Please name, email and password"
            })
        }

        // find user
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: "User already exists" });
        }

        // create user
        const user = await User.create({ name, email, password });

        // token and cookie
        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 5 * 60 * 100
        })

        // return user data
        res.status(201).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
            }
        })
    } catch (error) {
        console.log("Error creating user:", error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
};

//! login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            })
        }

        // find user
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                success: false, message: "Invalid credentials"
            })
        }

        const isMatch = await user.matchPassword(password)
        if (!isMatch) {
            return res.status(401).json({
                success: false, message: "Invalid credentials"
            })
        }

        // token and cookie
        const token = generateToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 5 * 60 * 1000,
        })

        // return user data
        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
            }
        })
    } catch (error) {
        console.log("Error logging in:", error.message)
        res.status(500).json({ success: false, message: error.message })
    }

};

//! logout
const logout = async (req, res) => {
    try {
        // clearing cookies
        res.cookie("token", "", {
            httpOnly: true,
            maxAge: 1
        })

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })

    } catch (error) {
        console.log("Error logging out:", error.message)
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

//! get me
const getMe = async (req, res) => {
    try {
        // find user
        const user = await User.findById(req.user.id)

        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
            }
        })
    } catch (error) {
        console.log("Error getting user:", error.message)
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

export { register, login, logout, getMe }
