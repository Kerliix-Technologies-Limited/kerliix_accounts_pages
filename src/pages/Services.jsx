import React from 'react';

export default function Services() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Connected Services</h1>

      <div className="space-y-4">
        <div className="bg-white/10 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-blue-300">Microsoft 365</h2>
          <p className="text-gray-300 text-sm">Plan: Family — Renews on Oct 1, 2025</p>
        </div>

        <div className="bg-white/10 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-blue-300">Google Drive</h2>
          <p className="text-gray-300 text-sm">Storage used: 15 GB / 100 GB</p>
        </div>

        <div className="bg-white/10 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-blue-300">GitHub</h2>
          <p className="text-gray-300 text-sm">Connected for code sync & access control.</p>
        </div>
      </div>
    </div>
  );
}
