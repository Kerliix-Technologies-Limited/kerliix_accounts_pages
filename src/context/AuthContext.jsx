import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../api.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user on mount — basic user fetch without refresh/login/logout
  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await API.get('/auth/me');
      setUser(res.data);
    } catch (error) {
      // Just clear user if unauthorized or error, no refresh attempts here
      setUser(null);
      console.error('Failed to fetch user:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context easily
export function useAuth() {
  return useContext(AuthContext);
}
