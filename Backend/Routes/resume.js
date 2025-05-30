import express from 'express';
import { verifyToken } from '../Middlewares/verifyToken.js';
import { uploadResume } from '../Controllers/resumeController.js';

const router = express.Router();

router.post('/resume-upload', verifyToken, uploadResume);

export default router;