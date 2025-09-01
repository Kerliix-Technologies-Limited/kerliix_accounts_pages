// src/pages/Devices.jsx
import { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../context/authContext";

export default function Devices() {
  const { user } = useAuth();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await API.get("/account/devices");
        setDevices(res.data || []);
      } catch (err) {
        console.error("Failed to fetch devices:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDevices();
  }, []);

  const handleTrustToggle = async (deviceId, trusted) => {
    try {
      if (trusted) {
        await API.post(`/account/devices/untrust/${deviceId}`);
        setDevices((prev) =>
          prev.map((d) =>
            d.id === deviceId ? { ...d, trusted: false } : d
          )
        );
      } else {
        await API.post(`/account/devices/trust/${deviceId}`);
        setDevices((prev) =>
          prev.map((d) =>
            d.id === deviceId ? { ...d, trusted: true } : d
          )
        );
      }
    } catch (err) {
      console.error("Failed to toggle trust:", err);
    }
  };

  const handleLogout = async (deviceId) => {
    try {
      await API.post(`/account/devices/logout/${deviceId}`);
      setDevices((prev) => prev.filter((d) => d.id !== deviceId));
    } catch (err) {
      console.error("Failed to logout device:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading devices...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">My Devices</h1>
      <p className="text-gray-600">
        Manage devices connected to your Kerliix account.
      </p>

      {/* Devices List */}
      <div className="grid md:grid-cols-2 gap-6">
        {devices.length > 0 ? (
          devices.map((d) => (
            <div
              key={d.id}
              className="bg-white p-6 rounded-2xl shadow flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold">{d.name}</h2>
                <p className="text-gray-600">OS: {d.os}</p>
                <p className="text-gray-600">Location: {d.location}</p>
                <p className="text-sm text-gray-500">
                  Last login: {new Date(d.lastLogin).toLocaleString()}
                </p>
                <p
                  className={`mt-2 text-sm font-medium ${
                    d.trusted ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {d.trusted ? "Trusted" : "Untrusted"}
                </p>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => handleTrustToggle(d.id, d.trusted)}
                  className={`px-4 py-2 rounded-lg text-white ${
                    d.trusted
                      ? "bg-yellow-600 hover:bg-yellow-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {d.trusted ? "Untrust" : "Trust"}
                </button>

                <button
                  onClick={() => handleLogout(d.id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                >
                  Logout
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No devices connected.</p>
        )}
      </div>

      {/* Add New Device */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-2">Add New Device</h2>
        <p className="text-gray-600 mb-4">
          To add a new device, sign in with your Kerliix account on that device.
          (QR code option coming soon.)
        </p>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
          Learn More
        </button>
      </div>
    </div>
  );
}

    
