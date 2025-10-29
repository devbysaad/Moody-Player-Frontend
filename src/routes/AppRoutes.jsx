import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import FacialExpression from "../components/FacialExpression";
import MoodSongs from "../components/MoodSongs";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-gray-100">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <FacialExpression />
              </ProtectedRoute>
            }
          />
          <Route
            path="/songs"
            element={
              <ProtectedRoute>
                <MoodSongs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRoutes;
