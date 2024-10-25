import express from 'express';
import { signIn, signInWithGoogle, signUp } from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/google', signInWithGoogle);

export default router;