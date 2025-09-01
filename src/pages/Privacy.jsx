// src/pages/Privacy.jsx
import { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../context/authContext";

export default function Privacy() {
  const { user } = useAuth();

  const [loginHistory, setLoginHistory] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resHistory = await API.get("/account/login-history");
        const resSessions = await API.get("/account/sessions");
        const res2fa = await API.get("/account/twofa-status");

        setLoginHistory(resHistory.data || []);
        setSessions(resSessions.data || []);
        setTwoFAEnabled(res2fa.data.enabled || false);
      } catch (err) {
        console.error("Failed to fetch security data:", err);
      }
    };
    fetchData();
  }, []);

  const handlePasswordChange = async () => {
    alert("Open modal for password change (to implement).");
  };

  const toggleTwoFA = async () => {
    try {
      if (twoFAEnabled) {
        await API.post("/account/twofa/disable");
        setTwoFAEnabled(false);
      } else {
        await API.post("/account/twofa/enable");
        setTwoFAEnabled(true);
      }
    } catch (err) {
      console.error("Failed to toggle 2FA:", err);
    }
  };

  const revokeSession = async (sessionId) => {
    try {
      await API.post(`/account/sessions/revoke/${sessionId}`);
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    } catch (err) {
      console.error("Failed to revoke session:", err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Security & Privacy</h1>

      {/* Change Password */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-2">Login & Authentication</h2>
        <button
          onClick={handlePasswordChange}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Change Password
        </button>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-2">Two-Factor Authentication</h2>
        <p className="text-gray-600 mb-4">
          {twoFAEnabled
            ? "Your account is protected with 2FA."
            : "Enable 2FA for extra security."}
        </p>
        <button
          onClick={toggleTwoFA}
          className={`px-4 py-2 rounded-lg ${
            twoFAEnabled
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {twoFAEnabled ? "Disable 2FA" : "Enable 2FA"}
        </button>
      </div>

      {/* Login History */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">Login History</h2>
        {loginHistory.length > 0 ? (
          <ul className="space-y-2">
            {loginHistory.map((l, i) => (
              <li
                key={i}
                className="flex justify-between border-b pb-2 text-gray-700"
              >
                <span>{l.device} — {l.location}</span>
                <span className="text-sm text-gray-500">
                  {new Date(l.timestamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No login history available.</p>
        )}
      </div>

      {/* Privacy Controls */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">Privacy Controls</h2>
        <div className="flex flex-col gap-3">
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800">
            Manage Connected Apps
          </button>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800">
            Download My Data
          </button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">Active Sessions</h2>
        {sessions.length > 0 ? (
          <ul className="space-y-3">
            {sessions.map((s) => (
              <li
                key={s.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="text-gray-700">
                    {s.device} — {s.location}
                  </p>
                  <p className="text-sm text-gray-500">
                    Last active: {new Date(s.lastActive).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => revokeSession(s.id)}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                >
                  Revoke
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No active sessions</p>
        )}
      </div>
    </div>
  );
}

      
