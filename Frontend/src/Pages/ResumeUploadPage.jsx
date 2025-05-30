import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

//   const handleUpload = async () => {
//     if (!file) {
//       toast.error("Please select a file first");
//       return;
//     }

//     setUploading(true);

//     const formData = new FormData();
//       formData.append("file", file);
//   formData.append("upload_preset", "PranHire_Resume");
//   formData.append("cloud_name", "PranHire-Cloud");

//     try {
//       // Upload to Cloudinary
//       const cloudinaryRes = await fetch(
//         `https://api.cloudinary.com/v1_1/PranHire-Cloud/upload`, // Replace with your cloud name
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await cloudinaryRes.json();
//       const cloudinaryUrl = data.secure_url;
//       //const cloudinaryData = await cloudinaryRes.json();

//       if (!cloudinaryUrl) {
//         throw new Error("Failed to get URL from Cloudinary");
//       }

      

//       const backendRes = await fetch("http://localhost:8000/api/resume/resume-upload", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({ resumeUrl: cloudinaryUrl }),
//       });
// console.log("Stored token:", localStorage.getItem("token"));
// const result = await backendRes.json();
// console.log("Upload result:", result);
//       const text = await backendRes.text();
//       // const backendData = await backendRes.json();
//       const backendData = json.parse;

//       console.log("Raw backend response:", text);

//       if (backendRes.ok) {
//         setResumeUrl(cloudinaryUrl);
//         toast.success("Resume uploaded and saved to profile!");
//       } else {
//         toast.error(backendData.message || "Failed to save resume to profile.");
//       }
//     } catch (error) {
//       console.error("Upload error:", error);
//       toast.error("Upload failed, please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

// const handleUpload = async () => {
//   if (!file) {
//     toast.error("Please select a resume file before uploading.");
//     return;
//   }

//   try {
//     setUploading(true);

//     // Upload to Cloudinary
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "your_preset");

//     const cloudRes = await fetch("https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/auto/upload", {
//       method: "POST",
//       body: formData,
//     });

//     const cloudData = await cloudRes.json();
//     const uploadedUrl = cloudData.secure_url;
//     setResumeUrl(uploadedUrl);

//     // ✅ Send to backend
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("You are not logged in.");
//       return;
//     }

//     const backendRes = await fetch("http://localhost:8000/api/resume/resume-upload", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ resumeUrl: uploadedUrl }),
//     });

//     if (!backendRes.ok) {
//       throw new Error("Backend rejected the resume upload");
//     }

//     const result = await backendRes.json();
//     console.log("Upload result:", result);
//     toast.success("Resume uploaded successfully!");
//   } catch (err) {
//     console.error("Upload error:", err);
//     toast.error("Upload failed. Please try again.");
//   } finally {
//     setUploading(false);
//   }
// };

const handleUpload = async () => {
  if (!file) {
    toast.error("Please select a resume file before uploading.");
    return;
  }

  try {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "PranHire_Resume");

    const cloudRes = await fetch("https://api.cloudinary.com/v1_1/PranHire-Cloud/auto/upload", {
      method: "POST",
      body: formData,
    });

    const cloudData = await cloudRes.json();

    if (!cloudData.secure_url) {
      throw new Error("Cloudinary upload failed");
    }

    const uploadedUrl = cloudData.secure_url;
    setResumeUrl(uploadedUrl);

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not logged in.");
      return;
    }

    const backendRes = await fetch("http://localhost:8000/api/resume/resume-upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ resumeUrl }),
      body: JSON.stringify({ resumeUrl: uploadedUrl }),

    });

    if (!backendRes.ok) {
      const errorRes = await backendRes.json();
       throw new Error(`Upload failed: ${errorRes.message || "Unknown error"}`);
    }
    console.log("Cloudinary URL:", resumeUrl);
    console.log("Sending token:", token);
    const result = await backendRes.json();
    console.log("Upload result:", result);
    toast.success("Resume uploaded successfully!");
  } catch (err) {
    console.error("Upload error:", err);
    toast.error(`Upload failed: ${err.message}`);
  } finally {
    setUploading(false);
  }
};

  
return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">
          Upload Your Resume
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Accepted formats: <span className="font-semibold text-blue-600">PDF, DOC, DOCX</span>
        </p>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="mb-4 w-full px-3 py-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`w-full py-2 rounded font-semibold transition ${
            uploading
              ? "bg-blue-300 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {uploading ? "Uploading..." : "Upload Resume"}
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
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default ResumeUpload;
