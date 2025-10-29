// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(`${BASE_URL}/auth/login`, form, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
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
          placeholder="Email or Username"
          value={form.identifier}
          onChange={(e) => setForm({ ...form, identifier: e.target.value })}
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
