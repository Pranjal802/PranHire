import express from 'express';
// import signup from '../Controllers/auth/signup.js';
import { signup, login, logout, emailvarification, resetpassword } from '../Controllers/authController.js';
const router = express.Router();

router.get('/signup', signup)
router.get('/login', login)
router.get('/logout', logout)
router.get('/resetpassword', resetpassword)
router.get('/emailvarification', emailvarification)

export default router;