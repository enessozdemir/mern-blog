import express from 'express';
import { createComment, getComments, likeComment } from '../controllers/comment.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();


router.post('/create-comment', verifyUser, createComment);
router.get('/comments/:postId', getComments);
router.put('/like-comment/:commentId', verifyUser, likeComment);

export default router;