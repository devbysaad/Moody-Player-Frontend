import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user"); // check if logged in

  if (!user) {
    // if no user, redirect to login page
    return <Navigate to="/login" replace />;
  }

  return children; // else show the page
};

export default ProtectedRoute;
