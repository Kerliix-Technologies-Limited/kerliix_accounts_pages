import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-4xl mb-6 font-bold">Welcome to OAuth Client</h1>
      <button
        onClick={login}
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Login with OAuth
      </button>
    </div>
  );
}
