// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  // Remove trailing slash if present to prevent double slashes
  const BASE_URL = (import.meta.env.VITE_REACT_APP_BACKEND_BASEURL || "http://localhost:3000").replace(/\/$/, "");
  const [form, setForm] = useState({ name: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Try with /auth/login first (standard path)
      let res;
      try {
        res = await axios.post(`${BASE_URL}/auth/login`, form, {
          withCredentials: true,
        });
      } catch (err) {
        // If that fails, try the root path as fallback
        if (err.response?.status === 404) {
          res = await axios.post(`${BASE_URL}/login`, form, {
            withCredentials: true,
          });
        } else {
          throw err;
        }
      }

      if (res.data.status === "success") {
        // Persist auth state for ProtectedRoute/Navbar
        try {
          if (res.data.user) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
          }
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
          }
        } catch (_) {}

        navigate("/dashboard", { replace: true });
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed. Please check your credentials or try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Moody Player
          </h1>
          <p className="text-gray-400 mt-2">Music that matches your mood</p>
        </div>
        
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900/70 backdrop-blur-md p-8 rounded-2xl shadow-[0_0_25px_rgba(139,92,246,0.3)] border border-purple-500/20 w-full"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Login
            </span>
          </h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 mb-6">
              <p className="text-red-400 text-center text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="text-sm text-gray-400 block mb-2 font-medium">Username</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  autoComplete="username"
                  className="w-full p-4 pl-4 rounded-lg bg-gray-800/70 text-white outline-none border border-gray-700 focus:border-purple-500 transition duration-200"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm text-gray-400 block mb-2 font-medium">Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  autoComplete="current-password"
                  className="w-full p-4 pl-4 rounded-lg bg-gray-800/70 text-white outline-none border border-gray-700 focus:border-purple-500 transition duration-200"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium text-lg hover:from-purple-700 hover:to-pink-700 transition duration-300 mt-6 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>

          <p className="text-gray-400 text-sm mt-6 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-purple-400 hover:text-pink-400 font-medium transition-colors">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
