import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // If the user is NOT logged in, send them back to the Home page (Hero)
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If they ARE logged in, show the requested page
  return children;
};

export default ProtectedRoute;