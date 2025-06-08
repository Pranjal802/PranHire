import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaThumbsUp, FaLightbulb, FaCheckCircle, FaExclamationTriangle, FaCopy, FaCheck } from 'react-icons/fa';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [copied, setCopied] = useState(false);

  const validateFile = (file) => {
    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      throw new Error('File size must be less than 5MB');
    }

    // Check file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Only PDF and DOCX files are supported');
    }

    return true;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      try {
        validateFile(selectedFile);
        setFile(selectedFile);
        setResumeUrl("");
        setAnalysis("");
        setShowAnalysis(false);
      } catch (error) {
        toast.error(error.message);
        e.target.value = ''; // Reset file input
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a resume file before uploading.");
      return;
    }

    try {
      setUploading(true);
      validateFile(file);

      console.log("Starting upload process...");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      console.log("Uploading to Cloudinary...");
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`;
      
      const cloudRes = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      const cloudData = await cloudRes.json();
      console.log("Cloudinary response:", cloudData);

      if (!cloudData.secure_url) {
        throw new Error("Cloudinary upload failed: No secure_url returned");
      }
      
      let finalUrl = cloudData.secure_url;
      if (finalUrl.includes('/image/upload/')) {
        console.log("PDF stored as image; adding 'fl_attachment' flag for correct delivery.");
        finalUrl = finalUrl.replace('/image/upload/', '/image/upload/fl_attachment/');
      }
      
      const uploadedUrl = finalUrl;
      console.log("Final URL for viewing:", uploadedUrl);
      setResumeUrl(uploadedUrl);

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not logged in.");
        setUploading(false);
        return;
      }

      console.log("Sending to backend for analysis...");
      const backendFormData = new FormData();
      backendFormData.append("file", file);
      backendFormData.append("resumeUrl", uploadedUrl);

      const backendRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/resume/resume-upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: backendFormData,
      });

      const result = await backendRes.json();
      
      if (!backendRes.ok) {
        console.error("Backend processing failed:", result);
        toast.error(result.message || "Failed to process resume");
        throw new Error(result.message || "Upload failed");
      }

      console.log("Backend processing complete");
      
      if (result.analysis) {
        setAnalysis(result.analysis);
        setShowAnalysis(true);
        toast.success("Resume uploaded and analyzed successfully!");
      } else {
        console.warn("No analysis returned from backend");
        toast.warning("Resume uploaded but analysis not available");
      }
    } catch (err) {
      console.error("Upload process error:", err);
      setResumeUrl("");
      setAnalysis("");
      setShowAnalysis(false);
      
      if (err.message.includes("file size")) {
        toast.error("File is too large. Maximum size is 5MB.");
      } else if (err.message.includes("file type")) {
        toast.error("Invalid file type. Please upload a PDF or DOCX file.");
      } else if (err.message.includes("not logged in")) {
        toast.error("Please log in to upload your resume.");
      } else if (!err.message.includes("Upload failed")) {
        toast.error("Upload failed. Please try again.");
      }
    } finally {
      setUploading(false);
    }
  };

  const handleCopy = () => {
    if (!analysis) return;

    navigator.clipboard.writeText(analysis).then(() => {
        setCopied(true);
        toast.success("Analysis copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    }, (err) => {
        console.error('Could not copy text: ', err);
        toast.error("Failed to copy analysis.");
    });
  };

  const renderAnalysis = () => {
    if (!analysis) return null;

    let strengthsContent = [];
    let improvementsContent = [];

    const strengthsBlock = analysis.split('**Strengths:**')[1]?.split('**Areas for Improvement:**')[0];
    const improvementsBlock = analysis.split('**Areas for Improvement:**')[1];

    if (strengthsBlock) {
        strengthsContent = strengthsBlock.match(/^\s*(\d+\.|-|\*)\s.*$/gm) || [];
        strengthsContent = strengthsContent.map(line => 
            line.trim().replace(/^(\d+\.|-|\*)\s*/, '').replace(/\*\*/g, '')
        );
    }

    if (improvementsBlock) {
        improvementsContent = improvementsBlock.match(/^\s*(\d+\.|-|\*)\s.*$/gm) || [];
        improvementsContent = improvementsContent.map(line => 
            line.trim().replace(/^(\d+\.|-|\*)\s*/, '').replace(/\*\*/g, '')
        );
    }

    const strengthsSection = { title: 'Strengths', content: strengthsContent };
    const improvementsSection = { title: 'Areas for Improvement', content: improvementsContent };

    return (
      <div className="mt-8 w-full animate-fade-in-up">
        <div className="relative bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100">
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            title="Copy Analysis"
          >
            {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
          </button>

          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
            AI Resume Analysis
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Strengths Section */}
            {strengthsSection.content.length > 0 && (
              <div className="bg-green-50 border-l-4 border-green-400 p-5 rounded-lg transition-all duration-300 hover:shadow-md">
                <div className="flex items-center mb-4">
                  <FaThumbsUp className="text-2xl text-green-500 mr-3" />
                  <h4 className="text-xl font-semibold text-green-800">{strengthsSection.title}</h4>
                </div>
                <ul className="space-y-3 pl-1">
                  {strengthsSection.content.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{strength}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Areas for Improvement Section */}
            {improvementsSection.content.length > 0 && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-lg transition-all duration-300 hover:shadow-md">
                <div className="flex items-center mb-4">
                  <FaLightbulb className="text-2xl text-yellow-500 mr-3" />
                  <h4 className="text-xl font-semibold text-yellow-800">{improvementsSection.title}</h4>
                </div>
                <ul className="space-y-3 pl-1">
                  {improvementsSection.content.map((improvement, index) => (
                    <li key={index} className="flex items-start">
                      <FaExclamationTriangle className="text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{improvement}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-start py-8 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-4xl px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">
            Upload Your Resume
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Accepted formats: <span className="font-semibold text-blue-600">PDF, DOCX</span>
            <br />
            <span className="text-sm">Maximum file size: 5MB</span>
          </p>
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            className="mb-4 w-full px-3 py-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button
            onClick={handleUpload}
            disabled={uploading || !file}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              uploading
                ? "bg-blue-300 text-white cursor-not-allowed"
                : !file
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {uploading ? "Uploading and Analyzing..." : "Upload and Analyze Resume"}
          </button>

          {resumeUrl && (
            <div className="mt-6 w-full text-center">
              <p className="text-green-700 font-semibold mb-2">Resume uploaded successfully!</p>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                View Resume
              </a>
            </div>
          )}
        </div>

        {showAnalysis && renderAnalysis()}
        
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default ResumeUpload;