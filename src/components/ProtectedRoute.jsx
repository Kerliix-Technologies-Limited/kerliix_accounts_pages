// components/ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useLocation } from 'react-router-dom';

const AUTH_LOGIN_URL = 'https://auth.kerliix.com/login';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      const currentUrl = window.location.href;
      const redirectParam = encodeURIComponent(currentUrl);
      window.location.href = `${AUTH_LOGIN_URL}?redirect=${redirectParam}`;
    }
  }, [user, loading, location]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return children;
}