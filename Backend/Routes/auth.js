import express from 'express';
// import signup from '../Controllers/auth/signup.js';
import { signup, login, logout, emailverification, forgotPassword , resetPassword, checkauth} from '../Controllers/authController.js';
import { verifyToken } from '../Middlewares/verifyToken.js';
const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.post('/forgotpassword', forgotPassword)
router.post('/resetpassword/:token', resetPassword)
router.post('/emailverification', emailverification)

router.get('/check-auth', verifyToken, checkauth)

export default router;