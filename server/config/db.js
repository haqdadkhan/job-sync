import dotenv from 'dotenv/config';
import mongoose from 'mongoose';

const URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("MongoDB connected successfully...");
    } catch (error) {
        console.log("Error connecting MongoDB:", error);
    }
}

export default connectDB;
