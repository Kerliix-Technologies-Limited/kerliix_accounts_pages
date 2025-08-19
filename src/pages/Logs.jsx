import React, { useState } from 'react';

const mockLogs = [
  {
    id: 1,
    timestamp: '2025-08-15 10:34:21',
    user: 'Alice Johnson',
    action: 'Login',
    status: 'Success',
    ip: '192.168.1.101',
  },
  {
    id: 2,
    timestamp: '2025-08-15 10:45:10',
    user: 'Bob Smith',
    action: 'Password Change',
    status: 'Success',
    ip: '192.168.1.105',
  },
  {
    id: 3,
    timestamp: '2025-08-15 11:02:43',
    user: 'Charlie Davis',
    action: 'Login',
    status: 'Failed',
    ip: '192.168.1.110',
  },
];

export default function Logs() {
  const [logs] = useState(mockLogs);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-4">System Logs</h1>
      <p className="text-white/80 mb-6">
        View audit logs and login attempts across the system.
      </p>

      <div className="overflow-x-auto max-w-full">
        <table className="min-w-full text-white border-collapse border border-white/20">
          <thead>
            <tr className="bg-white/10">
              <th className="border border-white/20 px-4 py-2 text-left">Timestamp</th>
              <th className="border border-white/20 px-4 py-2 text-left">User</th>
              <th className="border border-white/20 px-4 py-2 text-left">Action</th>
              <th className="border border-white/20 px-4 py-2 text-left">Status</th>
              <th className="border border-white/20 px-4 py-2 text-left">IP Address</th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0 ? (
              logs.map(({ id, timestamp, user, action, status, ip }) => (
                <tr
                  key={id}
                  className={`hover:bg-white/10 transition-colors ${
                    status === 'Failed' ? 'text-red-400' : ''
                  }`}
                >
                  <td className="border border-white/20 px-4 py-2">{timestamp}</td>
                  <td className="border border-white/20 px-4 py-2">{user}</td>
                  <td className="border border-white/20 px-4 py-2">{action}</td>
                  <td className="border border-white/20 px-4 py-2">{status}</td>
                  <td className="border border-white/20 px-4 py-2">{ip}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-white/60">
                  No logs available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
