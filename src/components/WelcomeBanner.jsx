// src/components/WelcomeBanner.jsx
import { useAuth } from "../context/authContext";

export default function WelcomeBanner() {
  const { user, loading } = useAuth();

  const getDisplayName = () => {
    if (loading) return "Loading...";
    if (!user) return "Guest";
    if (user.firstName && user.lastName) return `${user.firstName} ${user.lastName}`;
    return user.username || user.email || "Guest";
  };

  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-xl p-6 shadow-md mb-6">
      <h2 className="text-2xl font-bold">Welcome back, {getDisplayName()} 👋</h2>
      <p className="text-sm opacity-80 mt-1">
        We're glad to have you here. Here's what’s happening with your account today.
      </p>
    </div>
  );
}
