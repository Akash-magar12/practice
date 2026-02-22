import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // If already logged in, don't show the login/signup page
  // Redirect them to the Home (where they will see their Feed)
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If not logged in, show the Login/Signup page
  return children;
};

export default PublicRoute;