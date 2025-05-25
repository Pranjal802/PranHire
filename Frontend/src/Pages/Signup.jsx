import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { signup as signupAction } from "../Features/Auth/authSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegisterUser = async (e) => {


    e.preventDefault();
  if (!form.name || !form.email || !form.password || !form.confirmPassword) {
    setError("Please fill in all fields.");
    return;
  }
  if (form.password !== form.confirmPassword) {
    setError("Passwords do not match.");
    return;
  }
  setError("");



    // fetch("http://localhost:8000/api/v1/user/register", {
    //     headers: {
    //         contentType: "application/json",
    //     },
    //     method: "POST",
    //     body: JSON.stringify({
    //         name,
    //         email,
    //         password,
    //     })
    // })

  try {
    const response = await fetch("http://localhost:8000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
      }),
    });

    const data = await response.json();
    if(response.ok) {
       toast.success("Registration successful! Please check your email for verification.");
       navigate("/dashboard")
       dispatch(signupAction(data.newUser));
      //  dispatch(loginSuccess({ user: response.data.user, token: response.data.token }))

       setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
       });

      // Optionally, redirect after a delay:
    } else {
      setError(data.message || "Registration failed.");
      toast.error(data.message || "Registration failed.");
    }
    // You can handle the response here, e.g.:
    // const data = await response.json();
    // if (!response.ok) setError(data.message || "Registration failed.");
    } catch (err) {
      setError("An error occurred during registration.");
    }
  };
  
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
            Register for <span className="text-blue-500">PranHire</span>
          </h2>


        <form onSubmit={handleRegisterUser} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Create a password"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Confirm your password"
              required
            />
          </div>
          {error && (
            <div className="text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2 text-sm">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;