import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const raw = localStorage.getItem("user");
  let user = null;
  try {
    user = raw ? JSON.parse(raw) : null;
  } catch (_) {
    user = null;
  }
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
