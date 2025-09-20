import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const validateUrl = `${import.meta.env.VITE_API_URL}/api/auth/validate`;
        console.log('PrivateRoute: Validating token with URL:', validateUrl);
        // Verify token with backend
        const response = await fetch(validateUrl, {
          credentials: 'include',
        });

        console.log('PrivateRoute: Token validation response status:', response.status);
        if (response.ok) {
          setIsAuthenticated(true);
          console.log('PrivateRoute: Token validated successfully.');
        } else {
          // Token is invalid, remove it (if it was present and invalid)
          // Cookies.remove('token'); // No need to remove if HttpOnly
          setIsAuthenticated(false);
          console.log('PrivateRoute: Token validation failed, redirecting to login.');
        }
      } catch (error) {
        console.error('PrivateRoute: Auth check failed (network error or exception):', error);
        // Cookies.remove('token'); // No need to remove if HttpOnly
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
