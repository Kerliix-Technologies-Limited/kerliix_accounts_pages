// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../context/authContext";

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/account/profile");
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async () => {
    alert("Open modal/form for editing profile (to implement).");
  };

  const handleUploadPicture = async () => {
    alert("Open file picker to upload new profile picture (to implement).");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <p className="text-gray-600">Manage your account information.</p>

      {/* Profile Picture */}
      <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-6">
        <img
          src={profile?.avatarUrl || "/default-avatar.png"}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <p className="text-lg font-semibold">
            {profile?.firstName || "First"} {profile?.lastName || "Last"}
          </p>
          <p className="text-sm text-gray-500">{profile?.email}</p>
          <button
            onClick={handleUploadPicture}
            className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg"
          >
            Change Picture
          </button>
        </div>
      </div>

      {/* Basic Info */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-2">
        <h2 className="text-lg font-semibold mb-2">Basic Information</h2>
        <p className="text-gray-700">Username: {profile?.username}</p>
        <p className="text-gray-700">Phone: {profile?.phone || "Not set"}</p>
        <button
          onClick={handleUpdateProfile}
          className="mt-3 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
        >
          Edit Profile
        </button>
      </div>

      {/* Contact Preferences */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-2">Contact Preferences</h2>
        <p className="text-gray-700">
          Email: {profile?.preferences?.email ? "Enabled" : "Disabled"}
        </p>
        <p className="text-gray-700">
          SMS: {profile?.preferences?.sms ? "Enabled" : "Disabled"}
        </p>
        <p className="text-gray-700">
          Push Notifications:{" "}
          {profile?.preferences?.push ? "Enabled" : "Disabled"}
        </p>
        <button className="mt-3 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
          Manage Preferences
        </button>
      </div>

      {/* Language & Region */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-2">Language & Region</h2>
        <p className="text-gray-700">
          Language: {profile?.language || "English"}
        </p>
        <p className="text-gray-700">Region: {profile?.region || "Global"}</p>
        <button className="mt-3 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
          Change Language / Region
        </button>
      </div>

      {/* Recovery Information */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-2">Recovery Information</h2>
        <p className="text-gray-700">
          Backup Email: {profile?.recoveryEmail || "Not set"}
        </p>
        <p className="text-gray-700">
          Recovery Phone: {profile?.recoveryPhone || "Not set"}
        </p>
        <button className="mt-3 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
          Update Recovery Info
        </button>
      </div>
    </div>
  );
            }
          
