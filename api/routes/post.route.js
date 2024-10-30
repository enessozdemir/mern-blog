import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { createPost, deletePost, getPosts } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyUser, createPost);
router.get('/posts', getPosts);
router.delete('/delete/:postId/:userId', verifyUser, deletePost);


export default router;