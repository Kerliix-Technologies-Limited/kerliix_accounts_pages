import React from 'react';

export default function Devices() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Devices</h1>

      <div className="space-y-4">
        <div className="bg-white/10 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-blue-300">Windows PC</h2>
          <p className="text-gray-300 text-sm">Last active: 2 hours ago<br />IP: 192.168.1.4</p>
        </div>

        <div className="bg-white/10 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-blue-300">Pixel 7 Pro</h2>
          <p className="text-gray-300 text-sm">Last active: Today<br />IP: 10.0.0.22</p>
        </div>

        <div className="bg-white/10 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-blue-300">iPad Air</h2>
          <p className="text-gray-300 text-sm">Last active: 3 days ago<br />IP: 172.16.0.11</p>
        </div>
      </div>
    </div>
  );
}
