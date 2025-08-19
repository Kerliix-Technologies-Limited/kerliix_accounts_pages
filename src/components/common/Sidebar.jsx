import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import {
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiSettings,
  FiUser,
  FiShield,
  FiSmartphone,
  FiBarChart2,
  FiLogOut,
} from 'react-icons/fi';

const navItems = [
  { name: 'Dashboard', path: '/', icon: <FiHome /> },
  { name: 'Privacy', path: '/privacy', icon: <FiShield /> },
  { name: 'Devices', path: '/devices', icon: <FiSmartphone /> },
  { name: 'Services', path: '/services', icon: <FiBarChart2 /> },
  { name: 'Settings', path: '/settings', icon: <FiSettings /> },
  { name: 'Profile', path: '/profile', icon: <FiUser /> },
];

export default function Sidebar({ isOpen, toggleSidebar }) {
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768 && !isOpen) {
        toggleSidebar();
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, toggleSidebar]);

  return (
    <>
      {/* Overlay for mobile screens */}
      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      />

      {/* Sidebar container */}
      <div
        className={`bg-white/10 text-white border-r border-white/20 backdrop-blur-md fixed left-0 z-40 flex flex-col transition-all duration-300 ease-in-out
          ${isOpen ? 'w-60' : 'w-0 md:w-16'}
          top-[64px] h-[calc(100vh-64px)] overflow-hidden`}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4">
          {isOpen && (
            <span className="text-xl font-bold text-blue-400 select-none">
              Kerliix
            </span>
          )}

          {/* Toggle for desktop */}
          <button
            onClick={toggleSidebar}
            className="hidden md:inline text-white hover:text-blue-400 focus:outline-none"
            aria-label="Toggle Sidebar"
          >
            {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 space-y-1 flex-1 overflow-auto">
          {navItems.map(({ name, path, icon }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 text-sm rounded hover:bg-blue-600/30 transition-colors duration-200 ${
                  isActive ? 'bg-blue-500/30' : ''
                }`
              }
              end
            >
              <span className="text-lg">{icon}</span>
              {isOpen && <span>{name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-4 py-4 border-t border-white/20">
          <a
            href="https://auth.kerliix.com/logout"
            className="flex items-center gap-3 text-sm text-white hover:text-red-400 transition-colors duration-200"
          >
            <FiLogOut className="text-lg" />
            {isOpen && <span>Logout</span>}
          </a>
        </div>
      </div>
    </>
  );
}
