// src/pages/Settings.jsx
import { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../context/authContext";

export default function Settings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await API.get("/account/settings");
        setSettings(res.data);
      } catch (err) {
        console.error("Failed to fetch settings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleUpdate = (section) => {
    alert(`Open modal/form to update ${section} (to implement).`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <p className="text-gray-600">Manage your account preferences and tools.</p>

      {/* General Settings */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-2">
        <h2 className="text-lg font-semibold mb-2">General</h2>
        <p className="text-gray-700">
          Timezone: {settings?.timezone || "UTC"}
        </p>
        <p className="text-gray-700">
          Theme: {settings?.theme || "Light"}
        </p>
        <p className="text-gray-700">
          Accessibility:{" "}
          {settings?.accessibility?.enabled ? "Enabled" : "Disabled"}
        </p>
        <button
          onClick={() => handleUpdate("general")}
          className="mt-3 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
        >
          Edit General Settings
        </button>
      </div>

      {/* Communication Preferences */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-2">Communication</h2>
        <p className="text-gray-700">
          Emails: {settings?.communication?.emails ? "On" : "Off"}
        </p>
        <p className="text-gray-700">
          Product Updates:{" "}
          {settings?.communication?.updates ? "On" : "Off"}
        </p>
        <p className="text-gray-700">
          Marketing: {settings?.communication?.marketing ? "On" : "Off"}
        </p>
        <button
          onClick={() => handleUpdate("communication")}
          className="mt-3 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
        >
          Manage Preferences
        </button>
      </div>

      {/* API Keys / Developer Settings */}
      {user?.role === "developer" && (
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-2">API Keys</h2>
          {settings?.apiKeys?.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1">
              {settings.apiKeys.map((key, idx) => (
                <li key={idx} className="text-gray-700">
                  {key.name}:{" "}
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                    {key.value}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No API keys created yet.</p>
          )}
          <button
            onClick={() => handleUpdate("api keys")}
            className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Create New Key
          </button>
        </div>
      )}

      {/* Linked Accounts */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-2">Linked Accounts</h2>
        <ul className="space-y-2">
          {settings?.linkedAccounts?.map((acc, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center border rounded-lg p-3"
            >
              <span className="text-gray-700">{acc.provider}</span>
              <button className="text-sm text-red-600 hover:underline">
                Disconnect
              </button>
            </li>
          )) || (
            <p className="text-gray-500">No accounts linked yet.</p>
          )}
        </ul>
        <button
          onClick={() => handleUpdate("linked accounts")}
          className="mt-3 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
        >
          Link New Account
        </button>
      </div>

      {/* Customization */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-2">Customization</h2>
        <p className="text-gray-700">
          Profile Theme: {settings?.customization?.theme || "Default"}
        </p>
        <p className="text-gray-700">
          Avatar: {settings?.customization?.avatar || "Default"}
        </p>
        <button
          onClick={() => handleUpdate("customization")}
          className="mt-3 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
        >
          Customize
        </button>
      </div>

      {/* Danger Zone */}
      <div className="bg-white p-6 rounded-2xl shadow border border-red-300">
        <h2 className="text-lg font-semibold text-red-600 mb-2">
          Danger Zone
        </h2>
        <div className="space-y-2">
          <button className="w-full px-4 py-2 bg-yellow-100 hover:bg-yellow-200 rounded-lg">
            Reset Account
          </button>
          <button className="w-full px-4 py-2 bg-orange-100 hover:bg-orange-200 rounded-lg">
            Deactivate Account
          </button>
          <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

        
