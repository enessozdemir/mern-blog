import express from 'express';
import { removeUserImage, signIn, signInWithGoogle, signUp } from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/google', signInWithGoogle);
router.post('/remove-image', removeUserImage);

export default router;