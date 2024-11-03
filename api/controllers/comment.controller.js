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