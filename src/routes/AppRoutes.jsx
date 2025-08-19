import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Accounts from '../pages/Accounts';
import Admins from '../pages/Admins';
import Logs from '../pages/Logs';
import Analytics from '../pages/Analytics';
import Profile from '../pages/Profile';
import EditProfile from '../pages/EditProfile';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/admins" element={<Admins />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/settings" element={<Settings />} />

        {/* Show NotFound page for all unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
