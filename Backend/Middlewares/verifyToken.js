import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const cookieToken = req.cookies?.token;
        const headerToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
        const token = cookieToken || headerToken;

        // Log raw inputs for debugging
        console.log("=== Token Verification Debug ===");
        console.log("Auth Header:", authHeader);
        console.log("Cookie Token:", cookieToken);
        console.log("Header Token:", headerToken);
        console.log("Final Token Used:", token);
        console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);

        if (!token) {
            console.log("No token provided");
            return res.status(401).json({ 
                success: false,
                message: 'Unauthorized access: No token provided' 
            });
        }

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not configured!");
            return res.status(500).json({ 
                success: false,
                message: 'Server configuration error' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token successfully verified. Decoded payload:", decoded);

        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error("Token verification error:", {
            name: error.name,
            message: error.message,
            stack: error.stack
        });

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false,
                message: 'Token has expired' 
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid token format' 
            });
        }

        return res.status(401).json({ 
            success: false,
            message: 'Token verification failed' 
        });
    }
};