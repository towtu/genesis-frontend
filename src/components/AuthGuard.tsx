import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('access_token'); // Check if the user is logged in

  // If the user is authenticated, allow access to the protected routes
  // Otherwise, redirect to the login page
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthGuard;