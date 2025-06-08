import express from 'express';
import { verifyToken } from '../Middlewares/verifyToken.js';
import { uploadResume } from '../Controllers/resumeController.js';
//import { analyzeResume } from '../Services/geminiAnalyzer.js';
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // store file in memory

// Resume upload endpoint with error handling
// router.post('/resume-upload', verifyToken,async (req, res, next) => {
//   try {
//     await uploadResume(req, res);
//     const { resumeUrl } = req.body;
//     //await analyzeResume(buffer, mimetype);
//     //res.json({ analysis });
//   } catch (error) {
//     console.error('Resume upload error:', error);
//      res.status(500).json({ error: error.message });
//     next(error);
//   }
// });

router.post('/resume-upload', verifyToken,upload.single("file"), uploadResume);


// router.post('/analyze', async (req, res) => {
//   try {
//     const { resumeUrl } = req.body;
//     const analysis = await analyzeResume(resumeUrl);
//     res.json({ analysis });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

export default router;