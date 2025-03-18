import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicGuard: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('access_token'); // Check if the user is logged in

  // If the user is not authenticated, allow access to the public routes
  // Otherwise, redirect to the dashboard
  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default PublicGuard;