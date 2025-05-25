import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const generateJwtToken = (res, userId) => {
    const token = JWT.sign({ id:userId }, process.env.JWT_SECRET, {
        expiresIn: '7d' // Token will expire in 30 days
    })

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'strict', // Helps prevent CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
    });
}