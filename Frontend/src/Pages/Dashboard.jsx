import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">
          Welcome to your Dashboard
        </h2>
        <p className="text-gray-700 text-center mb-6">
          Here you can manage your profile, view your applications, and explore new opportunities with <span className="font-semibold text-blue-600">PranHire</span>.
        </p>
        {/* Add more dashboard widgets or sections here */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-4 shadow">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Profile</h3>
            <p className="text-gray-600">Update your personal information and resume.</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 shadow">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Applications</h3>
            <p className="text-gray-600">Track your job applications and their status.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;