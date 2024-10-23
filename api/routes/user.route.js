import express from 'express';
import { test } from '../controllers/user.controller.js';

const router = express.Router();

//test API
router.get('/test', test);

export default router;