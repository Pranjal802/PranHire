import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./Database/index.js";
import authRoutes from "./Routes/auth.js";
import resumeRoutes from "./Routes/resume.js";

// Load environment variables
dotenv.config({ path: "./.env" });

// Verify critical environment variables
console.log("Checking environment variables...");
const requiredEnvVars = ['GEMINI_API_KEY'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error("Missing required environment variables:", missingEnvVars);
  process.exit(1);
}

console.log("GEMINI_API_KEY starts with:", process.env.GEMINI_API_KEY.substring(0, 6));

const app = express();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('=== Unhandled Error ===');
  console.error('Error:', err);
  console.error('Stack:', err.stack);
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Global error handler for unhandled promises
process.on('unhandledRejection', (reason, promise) => {
  console.error('=== Unhandled Promise Rejection ===');
  console.error('Reason:', reason);
  console.error('Promise:', promise);
});

process.on('uncaughtException', (error) => {
  console.error('=== Uncaught Exception ===');
  console.error('Error:', error);
  console.error('Stack:', error.stack);
  process.exit(1);
});

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    environment: process.env.NODE_ENV,
    cors: {
      origin: corsOptions.origin,
      methods: corsOptions.methods
    }
  });
});

// Connect DB and Start Server
const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();
    console.log("\n✅ MongoDB connected successfully!");
    
    app.listen(PORT, () => {
      console.log(`\nServer is running on port: ${PORT}`);
      console.log('Environment:', process.env.NODE_ENV);
      console.log('GEMINI_API_KEY configured:', !!process.env.GEMINI_API_KEY);
      console.log('CORS origins:', corsOptions.origin);
    });
  } catch (error) {
    console.error("\n❌ Server startup failed:");
    console.error(error);
    process.exit(1);
  }
};

startServer();