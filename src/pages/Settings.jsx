import React from 'react';

export default function Settings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Account Settings</h1>

      <div className="space-y-6">
        {/* Language and Region */}
        <div className="bg-white/10 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-blue-300">Language & Region</h2>
          <p className="text-gray-300 text-sm mt-1">Language: English (US)</p>
          <p className="text-gray-300 text-sm">Time Zone: UTC +0</p>
        </div>

        {/* Notification Settings */}
        <div className="bg-white/10 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-blue-300">Notifications</h2>
          <p className="text-gray-300 text-sm mt-1">Email Alerts: Enabled</p>
          <p className="text-gray-300 text-sm">SMS Notifications: Disabled</p>
        </div>

        {/* Security Preferences */}
        <div className="bg-white/10 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-blue-300">Security Preferences</h2>
          <p className="text-gray-300 text-sm mt-1">Two-Factor Authentication: On</p>
          <p className="text-gray-300 text-sm">Backup Codes: Generated</p>
        </div>
      </div>
    </div>
  );
}
