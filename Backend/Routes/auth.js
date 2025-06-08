import express from 'express';
// import signup from '../Controllers/auth/signup.js';
import { signup, login, logout, emailverification, forgotPassword , resetPassword, checkauth, getProfile } from '../Controllers/authController.js';
import { verifyToken } from '../Middlewares/verifyToken.js';

const router = express.Router();

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ message: 'Auth route is working' });
});

// Wrap async route handlers with error handling
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.post('/signup', asyncHandler(signup));
router.post('/login', asyncHandler(login));
router.post('/logout', logout);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword/:token', resetPassword);
router.post('/emailverification', emailverification);
router.post('/verify-email', asyncHandler(emailverification));

// Single check-auth route with proper controller
router.get('/check-auth', verifyToken, asyncHandler(checkauth));

router.get("/profile", verifyToken, asyncHandler(getProfile));

export default router;