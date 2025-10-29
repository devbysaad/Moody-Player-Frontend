// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Navbar = ({ user }) => {
  const handleLogout = async () => {
    await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
    window.location.href = "/login";
  };

  return (
    <nav className="bg-gray-900 px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold text-purple-500">
        🎧 MoodySong
      </Link>

      <div className="flex items-center gap-6">
        {user ? (
          <>
            <Link
              to="/"
              className="hover:text-purple-400 transition text-white"
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="hover:text-purple-400 transition text-white"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:text-purple-400 transition text-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hover:text-purple-400 transition text-white"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
