import express from "express";
import { register, login, logout, getMe } from "../controllers/authController.js";
import protectAuth from "../middleware/authMiddleware.js";


const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.get("/me", protectAuth, getMe);

export default authRoutes;
