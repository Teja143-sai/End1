import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PublicRoute = ({ children, restricted = false }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  
  // Only set the redirect path for restricted routes
  const from = location.state?.from?.pathname || 
              (user ? `/${user.role || 'interviewee'}/dashboard` : '/');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Only redirect for restricted routes (like login/signup) when user is authenticated
  if (restricted && user) {
    return <Navigate to={from} state={{ from: location }} replace />;
  }

  return children;
};

export default PublicRoute;
