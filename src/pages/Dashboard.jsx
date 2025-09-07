// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import API from "../api";

// 🆕 Import WelcomeBanner component
import WelcomeBanner from "../components/WelcomeBanner";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [activity, setActivity] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resActivity = await API.get("/account/activity");
        const resNotifications = await API.get("/account/notifications");
        setActivity(resActivity.data || []);
        setNotifications(resNotifications.data || []);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
      </div>

      {/* 🆕 Welcome Banner */}
      <WelcomeBanner />

      {/* Account Status */}
      <div className="border-2 border-blue-600 p-6 rounded-2xl bg-transparent">
        <h2 className="text-lg font-semibold mb-2 text-white">Account Status</h2>
        <p className="text-gray-300">
          Status:{" "}
          <span className="font-medium text-green-400">
            {user?.status || "Active"}
          </span>
        </p>
        <p className="text-gray-300">
          Last login:{" "}
          {user?.lastLogin
            ? new Date(user.lastLogin).toLocaleString()
            : "Not available"}
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link
          to="/security"
          className="border-2 border-blue-600 p-4 rounded-2xl text-center text-white hover:bg-blue-900/10 transition"
        >
          <p className="font-medium">Security & Privacy</p>
        </Link>
        <Link
          to="/billing"
          className="border-2 border-blue-600 p-4 rounded-2xl text-center text-white hover:bg-blue-900/10 transition"
        >
          <p className="font-medium">Billing</p>
        </Link>
        <Link
          to="/devices"
          className="border-2 border-blue-600 p-4 rounded-2xl text-center text-white hover:bg-blue-900/10 transition"
        >
          <p className="font-medium">Devices</p>
        </Link>
      </div>

      {/* Notifications */}
      <div className="border-2 border-blue-600 p-6 rounded-2xl bg-transparent">
        <h2 className="text-lg font-semibold mb-4 text-white">Notifications</h2>
        {notifications.length > 0 ? (
          <ul className="space-y-2 text-gray-300">
            {notifications.map((n, i) => (
              <li key={i}>• {n.message}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No notifications</p>
        )}
      </div>

      {/* Recent Activity */}
      <div className="border-2 border-blue-600 p-6 rounded-2xl bg-transparent">
        <h2 className="text-lg font-semibold mb-4 text-white">Recent Activity</h2>
        {activity.length > 0 ? (
          <ul className="space-y-2 text-gray-300">
            {activity.map((a, i) => (
              <li key={i} className="flex justify-between">
                <span>{a.action}</span>
                <span className="text-sm text-gray-500">
                  {new Date(a.timestamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No recent activity</p>
        )}
      </div>

      {/* Recommendations */}
      <div className="border-2 border-blue-600 p-6 rounded-2xl bg-transparent">
        <h2 className="text-lg font-semibold mb-2 text-white">Recommendations</h2>
        <p className="text-gray-300">
          Secure your account by enabling{" "}
          <Link to="/security" className="text-blue-400 underline hover:text-blue-300">
            two-factor authentication
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
