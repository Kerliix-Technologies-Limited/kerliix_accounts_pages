import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';  // import your auth hook

export default function Navbar({ toggleSidebar }) {
  const { user } = useAuth();

  // Optional: fallback avatar if user has none
  const defaultAvatar = '/assets/kerliix-icon.png';

  // Optional: function to get user initials if no avatar
  const getInitials = () => {
    if (!user) return '';
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  };

  const initials = getInitials();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-blue-900 to-gray-900 border-b border-white/20 text-white px-4 py-3 flex items-center justify-between">
      {/* Left side: Menu icon on small screens */}
      <div className="flex items-center md:hidden">
        <button
          onClick={toggleSidebar}
          className="text-white hover:text-blue-400 focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          <FiMenu size={24} />
        </button>
      </div>

      {/* Center: Logo (hidden on small screens) */}
      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
        <Link to="/dashboard">
          <img
            src="https://raw.githubusercontent.com/kerliix/.github/main/company/logo.png"
            alt="Kerliix Logo"
            className="h-10 w-auto"
          />
        </Link>
      </div>

      {/* Right side: Username + Avatar or Initials */}
      <div className="flex items-center gap-4 ml-auto">
        <span className="text-sm hidden sm:inline">
          {user?.username || user?.email || 'Guest'}
        </span>

        <Link to="/profile" aria-label="Profile">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt="Profile"
              className="h-10 w-10 rounded-full border-2 border-white/30 hover:border-white transition"
            />
          ) : initials ? (
            <div
              className="h-10 w-10 rounded-full border-2 border-white/30 bg-blue-600 text-white flex items-center justify-center font-bold text-lg select-none hover:border-white transition"
              aria-label="User initials"
            >
              {initials}
            </div>
          ) : (
            <img
              src={defaultAvatar}
              alt="Default Profile Icon"
              className="h-10 w-10 rounded-full border-2 border-white/30 hover:border-white transition"
            />
          )}
        </Link>
      </div>
    </nav>
  );
}
