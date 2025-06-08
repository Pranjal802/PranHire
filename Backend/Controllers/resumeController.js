import User from "../Models/user.model.js";
import axios from "axios";
import cohere from "cohere-ai";
import { parsePDF } from "../utils/pdf/pdfParser.js";
import { analyzeResume } from "../Services/geminiAnalyzer.js";
import { extractTextFromResume } from "../utils/textExtractor.js";

export const uploadResume = async (req, res) => {
  try {
    console.log("\n=== Upload Resume Controller Started ===");
    
    // Check for user authentication
    if (!req.userId) {
      return res.status(401).json({ 
        message: "Unauthorized: User not authenticated" 
      });
    }

    // Check for file upload
    if (!req.file) {
      return res.status(400).json({ 
        message: "No file uploaded" 
      });
    }

    // Validate file
    if (!req.file.buffer || !req.file.mimetype) {
      return res.status(400).json({
        message: "Invalid file upload",
        error: "File buffer or mimetype missing"
      });
    }

    // Check file type
    const validMimeTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validMimeTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        message: "Invalid file type",
        error: "Only PDF and DOCX files are supported"
      });
    }

    // Find user
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ 
        message: "User not found" 
      });
    }

    // Save resume URL from request body
    if (req.body.resumeUrl) {
      user.resumeUrl = req.body.resumeUrl;
      user.resumeFileName = req.file.originalname;
      await user.save();
    }

    // Analyze resume
    try {
      console.log("Starting resume analysis...");
      const analysis = await analyzeResume(req.file.buffer, req.file.mimetype);
      
      return res.status(200).json({
        success: true,
        message: "Resume uploaded and analyzed successfully",
        analysis,
      });
    } catch (analysisError) {
      console.error("Resume analysis error:", analysisError);
      
      // Check for specific error types
      if (analysisError.message.includes("API key not configured")) {
        return res.status(500).json({
          message: "Resume analysis service not properly configured",
          error: "Configuration error"
        });
      }
      
      return res.status(500).json({
        message: "Failed to analyze resume",
        error: analysisError.message
      });
    }
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({
      message: "Server error during resume upload/analysis",
      error: error.message,
    });
  }
};