import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import axios from 'axios';
import fetch from "node-fetch"; // or native fetch in newer Node versions

export const extractTextFromResume = async (fileUrl) => {
  try {
    console.log("\n=== Starting text extraction ===");
    console.log("File URL:", fileUrl);
    
    // Validate URL
    if (!fileUrl.startsWith('http')) {
      console.error("Invalid URL format");
      throw new Error('Invalid URL: Only HTTP/HTTPS URLs are supported');
    }

    // Download file using axios
    console.log("Downloading file...");
    // const response = await axios.get(fileUrl, {
    //   responseType: 'arraybuffer',
    //   timeout: 15000, // 15 seconds timeout
    //   maxContentLength: 10 * 1024 * 1024, // 10MB max
    //   headers: {
    //     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    //   },
    //   validateStatus: false // Don't throw on any status
    // });
    const response = await fetch(cloudinaryUrl);
if (!response.ok) {
  throw new Error("Failed to download resume from Cloudinary");
}
const buffer = await response.buffer();

    console.log("Response status:", response.status);
    console.log("Content type:", response.headers['content-type']);

    if (response.status !== 200) {
      console.error("Download failed with status:", response.status);
      if (response.status === 401 || response.status === 403) {
        throw new Error('Access to file denied. Please check if the file is publicly accessible.');
      } else if (response.status === 404) {
        throw new Error('File not found. Please check if the URL is correct.');
      } else {
        throw new Error(`Failed to download file. Status: ${response.status}`);
      }
    }

    if (!response.data || !Buffer.isBuffer(response.data)) {
      throw new Error('Invalid response: No data received');
    }

    // const buffer = response.data;
    console.log("Download complete. File size:", buffer.length, "bytes");

    // Try to determine file type from buffer content
    const firstBytes = buffer.slice(0, 5).toString();
    const firstBytesHex = buffer.slice(0, 4).toString('hex');
    console.log("File signature:", { 
      text: firstBytes,
      hex: firstBytesHex,
      isPDF: firstBytes === '%PDF-',
      isDocx: firstBytesHex === '504b0304'
    });

    const isPDF = firstBytes === '%PDF-' || fileUrl.toLowerCase().endsWith('.pdf');
    const isDocx = firstBytesHex === '504b0304' || fileUrl.toLowerCase().endsWith('.docx');

    console.log("File type detection:", { isPDF, isDocx });

    if (!isPDF && !isDocx) {
      throw new Error('Unsupported file format. Only PDF and DOCX files are supported.');
    }

    // Extract text based on file type
    let text;
    if (isPDF) {
      console.log("Processing as PDF...");
      try {
        const data = await pdf(buffer);
        text = data.text.replace(/\s+/g, ' ').trim();
      } catch (pdfError) {
        console.error("PDF parsing error:", pdfError);
        throw new Error(`Failed to parse PDF file: ${pdfError.message}`);
      }
    } else {
      console.log("Processing as DOCX...");
      try {
        const result = await mammoth.extractRawText({ buffer });
        text = result.value.replace(/\s+/g, ' ').trim();
      } catch (docxError) {
        console.error("DOCX parsing error:", docxError);
        throw new Error(`Failed to parse DOCX file: ${docxError.message}`);
      }
    }

    if (!text || text.length === 0) {
      throw new Error('No text content extracted from file');
    }

    console.log("Text extracted successfully");
    console.log("Text length:", text.length);
    console.log("First 100 chars:", text.substring(0, 100));
    return text;

  } catch (error) {
    console.error('\n=== Text extraction failed ===');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        headers: error.response?.headers,
        config: error.config
      });
    }
    
    throw new Error(`Text extraction failed: ${error.message}`);
  }
};