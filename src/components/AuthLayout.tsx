import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface AuthLayoutProps {
  requireAuth?: boolean;
  redirectPath?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  requireAuth = false,
  redirectPath = '/login',
}) => {
  const { isAuthenticated} = useAuth();
  const location = useLocation();

  // Redirect if auth requirements not met
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Redirect to home if already authenticated but trying to access login/register
  if (!requireAuth && isAuthenticated && (location.pathname === '/login' || location.pathname === '/register')) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AuthLayout;