import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { createPost, getPosts } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyUser, createPost);
router.get('/posts', getPosts);


export default router;