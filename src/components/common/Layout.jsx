import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false); // start closed for mobile

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Routes where sidebar is NOT shown
  const noSidebarRoutes = ['/notfound'];
  // Routes where navbar is NOT shown
  const noNavbarRoutes = ['/notfound'];

  const showSidebar = !noSidebarRoutes.includes(location.pathname.toLowerCase());
  const showNavbar = !noNavbarRoutes.includes(location.pathname.toLowerCase());

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-900 via-black to-gray-900">
      {showSidebar && (
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      )}

      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          showSidebar
            ? sidebarOpen
              ? 'ml-0 md:ml-60'
              : 'ml-0 md:ml-16'
            : 'ml-0'
        }`}
      >
        {showNavbar && (
          <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        )}

        <main className={`${showNavbar ? 'mt-16' : 'mt-0'} p-6`}>
          {children}
        </main>
      </div>
    </div>
  );
}
