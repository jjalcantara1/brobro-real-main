import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = JSON.parse(localStorage.getItem('loginInfo'));
  const isLoggedIn = isAuthenticated; 
  return isLoggedIn ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
