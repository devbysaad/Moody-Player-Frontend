// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user, fetchUser } = useAuth(); // assuming your hook exposes fetchUser()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (!user) {
          await fetchUser?.();
        }
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [user, fetchUser]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-purple-400 animate-pulse">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-gray-400">
        No profile found 😕
      </div>
    );
  }

  return (

    <div className="max-w-md mx-auto bg-gray-900 rounded-xl shadow-lg p-6">
      <h1 className="text-3xl font-bold text-purple-400 mb-4 text-center">
        Profile
      </h1>

      <div className="space-y-3">
        <ProfileItem label="User ID" value={user.userId} />
        <ProfileItem label="Name" value={user.name || "Unknown"} />
        {user.email && <ProfileItem label="Email" value={user.email} />}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/login", { replace: true });
          }}
          className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white transition"
        >
          Logout
        </button>
      </div>
    </div>

  );
};

// 🧩 small reusable component for profile items
const ProfileItem = ({ label, value }) => (
  <p className="text-gray-300">
    <span className="font-semibold text-purple-400">{label}:</span> {value}
  </p>
);

export default Profile;
