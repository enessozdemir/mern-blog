import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { createPost, deletePost, getOnePost, getPosts, updatePost } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyUser, createPost);
router.get('/posts', getPosts);
router.delete('/delete/:postId/:userId', verifyUser, deletePost);
router.put('/update/:postId/:userId', verifyUser, updatePost);
router.get('/:postId', getOnePost);


export default router;