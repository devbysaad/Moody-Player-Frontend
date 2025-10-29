// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL || "http://localhost:3000";
  const [form, setForm] = useState({ name: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("https://moody-player-backend-authenticated.vercel.app/auth/login", form, {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4 text-sm">{error}</p>
        )}

        <input
          type="text"
          placeholder="Username"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          autoComplete="username"
          className="w-full p-3 rounded-lg mb-3 bg-gray-800 text-white outline-none"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          autoComplete="current-password"
          className="w-full p-3 rounded-lg mb-6 bg-gray-800 text-white outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Login
        </button>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-purple-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
