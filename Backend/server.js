import dotenv from "dotenv";
import connectDB from "./Database/index.js";
import app from "./App.js";
import authRoutes from "./Routes/auth.js";
import express from "express";

dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`\nServer is running on port: ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.error("Error in connection:", error.message);
    // process.exit(1);
  });

  app.use(express.json()); // Middleware to parse JSON requests
  app.use('/api/auth', authRoutes);