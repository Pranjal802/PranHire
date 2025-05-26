import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const generateJwtToken = (res, userId) => {
    const token = JWT.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    // Optionally set as cookie:
    // res.cookie('token', token, { ... });
    return token;
};

