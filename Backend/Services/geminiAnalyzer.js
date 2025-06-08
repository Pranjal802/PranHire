import { GoogleGenerativeAI } from "@google/generative-ai";
import pdf from 'pdf-parse';
import mammoth from 'mammoth';

// Initialize Gemini with error checking
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeResume = async (buffer, mimetype) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Gemini API key not configured");
    }

    console.log("Initializing Gemini with API key starting with:", process.env.GEMINI_API_KEY.substring(0, 6));

    // Get the model - using gemini-1.5-flash which is available on the v1beta endpoint.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log("Model initialized successfully with gemini-1.5-flash");

    // Extract text from resume
    let resumeText = "";
    try {
      console.log("Starting text extraction from file type:", mimetype);
      
      if (mimetype === "application/pdf") {
        const data = await pdf(buffer);
        resumeText = data.text;
      } else if (mimetype.includes("word")) {
        const result = await mammoth.extractRawText({ buffer });
        resumeText = result.value;
      }

      if (!resumeText || resumeText.trim().length === 0) {
        throw new Error("No text could be extracted from the resume");
      }

      console.log("Successfully extracted text, length:", resumeText.length);
      console.log("First 100 characters:", resumeText.substring(0, 100));
    } catch (extractError) {
      console.error("Text extraction error:", extractError);
      throw new Error(`Failed to extract text from resume: ${extractError.message}`);
    }

    // Create a safe prompt
    const prompt = `
    Please analyze this resume and provide structured feedback:

    Strengths:
    - List 3 key professional strengths
    - Focus on skills and experiences
    - Highlight notable achievements

    Areas for Improvement:
    - Suggest 3 specific improvements
    - Include format and content suggestions
    - Mention any missing key elements

    Resume Text:
    ${resumeText}
    `;

    console.log("Sending prompt to Gemini, length:", prompt.length);

    // Generate content with proper error handling
    try {
      console.log("Starting content generation...");
      const result = await model.generateContent(prompt);
      console.log("Content generated successfully");
      const response = await result.response;
      const text = response.text();
      console.log("Response text length:", text.length);
      return text;
    } catch (generationError) {
      console.error("Generation error details:", {
        name: generationError.name,
        message: generationError.message,
        stack: generationError.stack
      });
      throw new Error(`AI generation failed: ${generationError.message}`);
    }

  } catch (error) {
    console.error("Resume analysis failed:", {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    throw new Error(`Resume analysis failed: ${error.message}`);
  }
};