import { Link } from 'react-router-dom';

export default function Navbar() {
  const user = {
    username: 'kerliix_user',
    email: 'user@kerliix.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=32', // same image as in Profile.jsx
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-blue-900 to-gray-900 border-b border-white/20 text-white px-6 py-4 flex items-center justify-between">
      
      {/* Left placeholder to help center the logo */}
      <div className="w-10 sm:w-32"></div>

      {/* Centered Logo */}
      <Link to="/dashboard" className="absolute left-1/2 transform -translate-x-1/2">
        <img
          src="https://raw.githubusercontent.com/kerliix/.github/main/company/logo.png"
          alt="Kerliix Logo"
          className="h-10 w-auto"
        />
      </Link>

      {/* Profile section on the right */}
      <div className="flex items-center gap-4">
        <span className="text-sm hidden sm:inline">
          {user?.username || user?.email || 'Guest'}
        </span>
        <Link to="/profile">
          <img
            src={user.avatarUrl}
            alt="Profile"
            className="h-10 w-10 rounded-full border-2 border-white/30 hover:border-white transition"
          />
        </Link>
      </div>
    </nav>
  );
}
