import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username == '' || email == '' || password == '') {
        return next(errorHandler(400, 'All fields are required'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    try {
        const user = await User.create({ username, email, password: hashedPassword });
        user.save();
        return res.status(201).json({ message: 'User created successfully', data: user }); ƒ
    } catch (err) {
        next(err);
    }
};

export const signIn = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email == '' || password == '') {
        next(errorHandler(400, 'All fields are required'));
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return next(errorHandler(404, 'User not found'));
        }

        const isMatch = bcryptjs.compareSync(password, user.password);

        if (!isMatch) {
            return next(errorHandler(401, 'Invalid credentials'));
        }

        const { password: userPassword, ...rest } = user._doc;

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).cookie('access_token', token, {
            httpOnly: true,
        }).json(rest);

        return res.status(200).json({ message: 'User signed in successfully', data: user });
    } catch (err) {
        next(err);
    }
};

export const signInWithGoogle = async (req, res, next) => {
    const { username, email, googlePhotoUrl } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            const { password, ...rest } = user._doc;
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            return res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = await User.create({
                username: username.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl
            });
            await newUser.save();
        }
        
        const { password, ...rest } = newUser._doc;
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        return res.status(200).cookie('access_token', token, {
            httpOnly: true,
        }).json(rest);

    } catch (error) {
        next(error);
    }

};