import React from "react";
import { Outlet, Navigate } from "react-router-dom";

// Define a custom ProtectedRoute component
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
