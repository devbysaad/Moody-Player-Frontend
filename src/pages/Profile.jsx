// src/pages/Profile.jsx
import React from "react";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  if (!user)
    return <div className="text-center mt-10 text-gray-400">No Profile</div>;

  return (
    <div className="max-w-md mx-auto bg-gray-900 rounded-xl shadow-lg p-6 mt-10">
      <h1 className="text-3xl font-bold text-purple-400 mb-4">Profile</h1>
      <p className="text-gray-300">
        <span className="font-semibold text-purple-400">User ID:</span>{" "}
        {user.userId}
      </p>
      <p className="text-gray-300 mt-2">
        <span className="font-semibold text-purple-400">Name:</span>{" "}
        {user.name || "Unknown"}
      </p>
    </div>
  );
};

export default Profile;
