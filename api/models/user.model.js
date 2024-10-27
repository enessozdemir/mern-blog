import mongoose from "mongoose";
import { configDotenv } from 'dotenv';
configDotenv();

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: process.env.DEFAULT_IMAGE_URL
    }
    },{ timestamps: true }   
);

const User = mongoose.model('User', userSchema);
export default User;

