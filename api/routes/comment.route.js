import express from 'express';
import { createComment, deleteComment, getComments, likeComment } from '../controllers/comment.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();


router.post('/create-comment', verifyUser, createComment);
router.get('/comments/:postId', getComments);
router.put('/like-comment/:commentId', verifyUser, likeComment);
router.delete('/delete-comment/:commentId', verifyUser, deleteComment);

export default router;