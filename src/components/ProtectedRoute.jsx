import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useMemo } from 'react';

const ProtectedRoute = ({ 
  children, 
  requiredRole = null, 
  redirectPath = null,
  render = null
}) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Memoize the target path to prevent unnecessary recalculations
  const targetPath = useMemo(() => {
    if (!user) return '/login';
    if (requiredRole && user.role !== requiredRole) {
      return redirectPath || `/${user.role}/dashboard`;
    }
    return null;
  }, [user, requiredRole, redirectPath]);

  // Handle navigation in an effect to prevent render phase updates
  useEffect(() => {
    if (isLoading) return;
    
    if (targetPath) {
      navigate(targetPath, { 
        replace: true,
        state: targetPath === '/login' ? { from: location } : undefined
      });
    }
  }, [targetPath, isLoading, navigate, location]);

  // Show loading state only when necessary
  if (isLoading || (user && targetPath)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If we have a user and no redirection is needed, render the content
  if (user && !targetPath) {
    // Check if we're coming from login and should redirect to home
    const isFromLogin = location.state?.from?.pathname === '/login';
    const isDashboardRoute = location.pathname.startsWith('/interviewer') || 
                           location.pathname.startsWith('/interviewee') ||
                           location.pathname === '/dashboard';
    
    // If coming from login and on a dashboard route, redirect to home
    if (isFromLogin && isDashboardRoute) {
      return <Navigate to="/" replace />;
    }
    
    return typeof render === 'function' ? render({ user }) : children;
  }

  // If we get here, we're still loading or redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
};

export default ProtectedRoute;
