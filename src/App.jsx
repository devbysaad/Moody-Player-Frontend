// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="text-white flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
        <Navbar user={user} />
        <Routes>
          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" replace />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
