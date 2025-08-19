import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load tokens/user from localStorage (optional)
  useEffect(() => {
    const savedTokens = localStorage.getItem('tokens');
    const savedUser = localStorage.getItem('user');
    if (savedTokens && savedUser) {
      setTokens(JSON.parse(savedTokens));
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (tokens && user) {
      localStorage.setItem('tokens', JSON.stringify(tokens));
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('tokens');
      localStorage.removeItem('user');
    }
  }, [tokens, user]);

  const login = () => {
    // Redirect to backend /auth/login to start OAuth flow
    window.location.href = 'http://localhost:5000/auth/login';
  };

  const logout = async () => {
    setLoading(true);
    try {
      await fetch('http://localhost:5000/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error', error);
    } finally {
      setTokens(null);
      setUser(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, tokens, setTokens, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
