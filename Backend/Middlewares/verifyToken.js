import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const cookieToken = req.cookies?.token;
        const headerToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
        const token = cookieToken || headerToken;

        // Log raw inputs
        console.log("Auth Header:", authHeader);
        console.log("Cookie Token:", cookieToken);
        console.log("Header Token:", headerToken);
        console.log("Final Token Used:", token);

        if (!token) {
            console.log("No token provided. Unauthorized access.");
            return res.status(401).json({ message: 'Unauthorized access: No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            console.log("Token verification failed. Invalid token.");
            return res.status(403).json({ message: 'Invalid token' });
        }

        // Log decoded token info
        console.log("Decoded JWT Payload:", decoded);

        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error("Token verification error:", error.message);
        return res.status(403).json({ message: 'Invalid token' });
    }
};

// export const verifyToken = (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "No token provided" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // This is where req.user.id comes from
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// import jwt from 'jsonwebtoken';

// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// export default verifyToken;

