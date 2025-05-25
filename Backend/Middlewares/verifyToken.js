import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //   req.userId = decoded.id;
        if(!decoded) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        console.log("Decoded JWT:", decoded); // Debugging line to check the decoded token
        req.userId = decoded.id; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}