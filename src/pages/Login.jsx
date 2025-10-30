// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  // Remove trailing slash if present to prevent double slashes
  const BASE_URL = (import.meta.env.VITE_REACT_APP_BACKEND_BASEURL || "http://localhost:3000").replace(/\/$/, "");
  const [form, setForm] = useState({ name: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, form, {
        withCredentials: true,
      });

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
      setError(err.response?.data?.message || "Login failed");
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
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-lg font-semibold transition duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            Sign In
          </button>

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
