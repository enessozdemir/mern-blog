import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
    const { content, postId, userId } = req.body;
    try {
        if (userId !== req.user.id) {
            const error = new Error("Unauthorized");
            error.statusCode = 401;
            throw error;
        }

        const comment = new Comment({
            content,
            postId,
            userId,
        });

        await comment.save();
        res.status(201).json({ data: comment, message: "Comment created" });
    } catch (error) {
        return next(error);
    }
};

export const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId }).sort({
            createdAt: -1,
        });
        res.status(200).json({ data: comments });
    } catch (error) {
        return next(error);
    }
};

export const likeComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return next(errorHandler(404, 'Comment not found'));
        }
        const userIndex = comment.likes.indexOf(req.user.id);
        if (userIndex === -1) {
            comment.numberOfLikes += 1;
            comment.likes.push(req.user.id);
        } else {
            comment.numberOfLikes -= 1;
            comment.likes.splice(userIndex, 1);
        }
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
};

export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return next(errorHandler(404, 'Comment not found'));
        }

        if (comment.userId !== req.user.id && !req.user.isAdmin) {
            return next(errorHandler(401, 'You are not allowed to delete this comment'));
        }

        await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
        return next(error);
    }
};
