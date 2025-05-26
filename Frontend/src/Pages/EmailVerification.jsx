import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmailVerification = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input change for OTP fields
  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (val.length > 1) return;
    const newCode = [...code];
    newCode[idx] = val;
    setCode(newCode);

    // Move to next input if value entered
    if (val && idx < 5) {
      document.getElementById(`otp-${idx + 1}`).focus();
    }
    // Move to previous input if deleted
    if (!val && idx > 0) {
      document.getElementById(`otp-${idx - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    if (verificationCode.length !== 6) {
      toast.error("Please enter the 6-digit verification code.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/auth/emailverification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: verificationCode }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Email verified successfully! Please login.");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(data.message || "Invalid or expired verification code.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          Email Verification
        </h2>
        <p className="mb-6 text-gray-600 text-center">
          Enter the 6-digit code sent to your email.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex space-x-2 mb-6">
            {code.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, idx)}
                className="w-12 h-12 text-2xl text-center border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                autoFocus={idx === 0}
              />
            ))}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default EmailVerification;