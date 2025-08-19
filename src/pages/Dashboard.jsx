import React from 'react';

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
      <p className="text-gray-400">
        This is your main control panel. You can access your personal info, privacy settings, and connected devices from the sidebar.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-blue-300">Account Summary</h2>
          <p className="text-sm text-gray-300 mt-2">Basic overview of your account activity and data.</p>
        </div>
        <div className="bg-white/10 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-blue-300">Security Status</h2>
          <p className="text-sm text-gray-300 mt-2">2FA: Enabled<br />Last login: 2 hours ago</p>
        </div>
        <div className="bg-white/10 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-blue-300">Devices</h2>
          <p className="text-sm text-gray-300 mt-2">3 active devices<br />1 new sign-in this week</p>
        </div>
      </div>
    </div>
  );
}
