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
    <nav className="bg-gray-900 shadow-lg sticky top-0  z-50 ">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex flex-wrap gap-3 justify-between items-center">
        <Link to="/" className="text-xl font-bold text-purple-400 hover:text-purple-300">
          MoodyTunes
        </Link>

        <div className="flex gap-4 md:gap-6 items-center flex-wrap justify-end">
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-300 hover:text-white">
                Dashboard
              </Link>
              <Link to="/profile" className="text-gray-300 hover:text-white">
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white">
                Login
              </Link>
              <Link to="/register" className="text-gray-300 hover:text-white">
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
