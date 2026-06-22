import express from 'express';
import dotenv from 'dotenv/config';
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT;

const app = express();
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser());

connectDB();

app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the App"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at 'http://localhost:${PORT}`);
});
