// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import API from "../api";

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
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <span className="text-sm text-gray-500">
          Welcome back, {user?.name || "Guest"}
        </span>
      </div>

      {/* Account Status */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-2">Account Status</h2>
        <p className="text-gray-600">
          Status:{" "}
          <span className="font-medium text-green-600">
            {user?.status || "Active"}
          </span>
        </p>
        <p className="text-gray-600">
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
          className="bg-gray-50 hover:bg-gray-100 p-4 rounded-2xl shadow-sm border text-center"
        >
          <p className="font-medium">Security & Privacy</p>
        </Link>
        <Link
          to="/billing"
          className="bg-gray-50 hover:bg-gray-100 p-4 rounded-2xl shadow-sm border text-center"
        >
          <p className="font-medium">Billing</p>
        </Link>
        <Link
          to="/devices"
          className="bg-gray-50 hover:bg-gray-100 p-4 rounded-2xl shadow-sm border text-center"
        >
          <p className="font-medium">Devices</p>
        </Link>
      </div>

      {/* Notifications */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">Notifications</h2>
        {notifications.length > 0 ? (
          <ul className="space-y-2">
            {notifications.map((n, i) => (
              <li key={i} className="text-gray-700">
                • {n.message}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No notifications</p>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        {activity.length > 0 ? (
          <ul className="space-y-2">
            {activity.map((a, i) => (
              <li key={i} className="flex justify-between text-gray-700">
                <span>{a.action}</span>
                <span className="text-sm text-gray-500">
                  {new Date(a.timestamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recent activity</p>
        )}
      </div>

      {/* Recommendations */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-2">Recommendations</h2>
        <p className="text-gray-600">
          Secure your account by enabling{" "}
          <Link to="/security" className="text-blue-600 underline">
            two-factor authentication
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

          
