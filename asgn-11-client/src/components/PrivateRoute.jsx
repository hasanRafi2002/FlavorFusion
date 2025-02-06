




import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import cookies

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // Check if token exists in cookies
  const token = Cookies.get('token');

  if (loading) {
    return <span className="loading loading-infinity loading-lg"></span>;
  }

  if (user || token) {
    return children; // If user or token exists, render the children (protected route content).
  }
  return (
    <Navigate to="/login"  state={{ from: window.location.pathname }}></Navigate>
);// Redirect to login if not authenticated.
};

export default PrivateRoute;
