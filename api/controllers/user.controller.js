import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const test = (req, res) => {
    res.json({ message: 'API is working' });
};

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this user!'));
    }

    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, 'Password must be at least 6 characters long!'));
        }
        req.body.password = await bcryptjs.hash(req.body.password, 10);
    }


    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(errorHandler(400, 'Username must be between 7 and 20 characters long!'));
        }

        if (req.body.username.includes(' ')) {
            return next(errorHandler(400, 'Username must not contain spaces!'));
        }

        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, 'Username must be in lowercase!'));
        }

        if (req.body.username !== req.body.username.replace(/[^a-zA-Z0-9]/g, '')) {
            return next(errorHandler(400, 'Username must not contain special characters!'));
        }
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                profilePicture: req.body.profilePicture,
                password: req.body.password
            }
        }, { new: true });
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        return next(error)
    }
};

export const deleteUser = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to delete this user!'));
    }

    try {
        await User.findByIdAndDelete(req.params.userId);
        return res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        return next(error);
    }
};

export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json({ message: 'User has been signed out!' });
    } catch (error) {
        return next(error);
    }
};

export const getUsers = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to view all users!'));
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;

        const users = await User.find()
            .skip(startIndex)
            .limit(limit)
            .sort({ createdAt: sortDirection })
            .select('-password');

        const totalUsers = await User.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
        const lastMonthUsers = await User.countDocuments({ createdAt: { $gte: oneMonthAgo } });

        res.status(200).json({ users, totalUsers, lastMonthUsers });
    } catch (error) {
        return next(error);
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');
        res.status(200).json(user);
    } catch (error) {
        return next(error);
    }
};


export const getOneUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');
        if (!user) {
            return next(errorHandler(404, 'User not found!'));
        }
        res.status(200).json(user);
    } catch (error) {
        return next(error);
    }
};