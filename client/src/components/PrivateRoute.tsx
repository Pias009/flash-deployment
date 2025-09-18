import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('token');
      
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        // Verify token with backend
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin`, {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          // Token is invalid, remove it
          Cookies.remove('token');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        Cookies.remove('token');
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
