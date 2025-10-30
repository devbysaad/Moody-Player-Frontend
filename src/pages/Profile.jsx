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
    <div className="container-fluid py-8 md:py-12">
      <div className="max-w-md mx-auto card backdrop-blur-md p-6 md:p-8">
        <h1 className="text-3xl font-bold gradient-text mb-6 text-center">
          Your Profile
        </h1>

        <div className="space-y-4 mb-8">
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
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Logout
          </button>
        </div>
      </div>
    </div>

  );
};

// 🧩 small reusable component for profile items
const ProfileItem = ({ label, value }) => (
  <div className="p-3 bg-gray-800/30 rounded-lg border border-purple-500/10">
    <p className="text-gray-200">
      <span className="font-semibold gradient-text">{label}:</span> {value}
    </p>
  </div>
);

export default Profile;
