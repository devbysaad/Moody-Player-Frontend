import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const raw = localStorage.getItem("user");
  let user = null;
  try {
    user = raw ? JSON.parse(raw) : null;
  } catch (_) {
    user = null;
  }

  // Logout moved to Profile page per requirements

  return (
    <nav className="bg-gray-900/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-wrap gap-3 justify-between items-center">
        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent hover:opacity-90 transition-opacity">
          Moody Player
        </Link>

        <div className="flex gap-4 md:gap-6 items-center flex-wrap justify-end">
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className="text-gray-300 hover:text-white transition-colors px-3 py-1 rounded-lg hover:bg-gray-800/50"
              >
                Dashboard
              </Link>
              <Link 
                to="/profile" 
                className="text-gray-300 hover:text-white transition-colors px-3 py-1 rounded-lg hover:bg-gray-800/50"
              >
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-gray-300 hover:text-white transition-colors px-3 py-1 rounded-lg hover:bg-gray-800/50"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-medium transition duration-300 shadow-md"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
