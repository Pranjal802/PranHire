import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"; // <-- Add this import
import connectDB from "./Database/index.js";
import authRoutes from "./Routes/auth.js";
import resumeRoutes from "./Routes/resume.js"; // Import resume routes

dotenv.config({ path: "./.env" });

const app = express(); // ✅ Initialize express here

// ✅ CORS middleware BEFORE other middlewares and routes
// app.use(cors({
//   origin: "*" // allow cookies if needed
// }));
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true, // allow cookies if needed
}));

// ✅ Middlewares BEFORE routes
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/resume',resumeRoutes) // ✅ Routes come after middlewares
// app.use("/resumes", express.static("uploads/resumes"));

// ✅ Connect DB and Start Server
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`\nServer is running on port: ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.error("Error in connection:", error.message);
  });