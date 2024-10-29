import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const createPost = async (req, res, next) => {
    console.log(req.user.id);
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "You are not allowed to create a post"));
    } else if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, "Please provide all required fields"));
    }

    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
    const newPost = new Post({
        ...req.body, slug, userId: req.user.id
    })

    try {
        const savedPost = await newPost.save();
        return res.status(201).json(savedPost);
    } catch (error) {
        return next(error)
    }
};