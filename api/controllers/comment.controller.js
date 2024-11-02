import Comment from "../models/comment.model.js";

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