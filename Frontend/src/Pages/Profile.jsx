import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      console.log("Stored token for profile:", token);
      if (!token) {
        toast.error("User not logged in");
        return;
      }

      try {
        const res = await fetch("http://localhost:8000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
          setResumeUrl(data.user.resumeUrl);
        } else {
          toast.error(data.message || "Failed to load profile");
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        toast.error("Error loading profile");
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Your Profile
        </h2>

        <div className="space-y-4">
          <div>
            <p className="text-gray-600 font-semibold">Name:</p>
            <p className="text-gray-900">{user.name}</p>
          </div>

          <div>
            <p className="text-gray-600 font-semibold">Email:</p>
            <p className="text-gray-900">{user.email}</p>
          </div>

          <div>
            <p className="text-gray-600 font-semibold">Resume:</p>
            {resumeUrl ? (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                View Resume
              </a>
            ) : (
              <p className="text-red-500">No resume uploaded yet.</p>
            )}
          </div>
        </div>

        {/* Optional: Logout or Edit buttons */}
        {/* <div className="mt-6 flex justify-center gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Edit Profile
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Logout
          </button>
        </div> */}

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default Profile;
