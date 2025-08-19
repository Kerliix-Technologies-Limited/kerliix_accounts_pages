import React, { useState } from 'react';

const mockAdmins = [
  { id: 1, name: 'Joseph Kaggwa', email: 'joseph@example.com', status: 'Active' },
  { id: 2, name: 'Brenda Nakiyo', email: 'brenda@example.com', status: 'Active' },
  { id: 3, name: 'Charles Mugisha', email: 'charles@example.com', status: 'Suspended' },
  { id: 4, name: 'Lydia Namugala', email: 'lydia@example.com', status: 'Active' },
  { id: 5, name: 'Grace Sebatindira', email: 'grace@example.com', status: 'Active' },
  { id: 6, name: 'Oscar Kisakye', email: 'oscar@example.com', status: 'Suspended' },
  { id: 7, name: 'Hellen Namatovu', email: 'hellen@example.com', status: 'Active' },
  { id: 8, name: 'Andrew Kintu', email: 'andrew@example.com', status: 'Active' },
  { id: 9, name: 'Catherine Nakku', email: 'catherine@example.com', status: 'Active' },
  { id: 10, name: 'Brian Luwaga', email: 'brian@example.com', status: 'Suspended' },
  { id: 11, name: 'Karen Namuddu', email: 'karen@example.com', status: 'Active' },
  { id: 12, name: 'Michael Ssewanyana', email: 'michael@example.com', status: 'Active' },
  { id: 13, name: 'Winfred Nakigga', email: 'winfred@example.com', status: 'Active' },
  { id: 14, name: 'Daniel Matovu', email: 'daniel@example.com', status: 'Suspended' },
  { id: 15, name: 'Patricia Namatovu', email: 'patricia@example.com', status: 'Active' },
  { id: 16, name: 'Yusuf Kawalya', email: 'yusuf@example.com', status: 'Active' },
  { id: 17, name: 'Florence Nakazibwe', email: 'florence@example.com', status: 'Active' },
  { id: 18, name: 'Gloria Nakabugo', email: 'gloria@example.com', status: 'Active' },
  { id: 19, name: 'John Sebalwa', email: 'john@example.com', status: 'Suspended' },
  { id: 20, name: 'Fiona Namiremu', email: 'fiona@example.com', status: 'Active' },
];

export default function Admins() {
  const [admins] = useState(mockAdmins);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAdmins = admins.filter(({ id, name, email }) => {
    const term = searchTerm.toLowerCase();
    return (
      id.toString().includes(term) ||
      name.toLowerCase().includes(term) ||
      email.toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-4">Admin Management</h1>
      <p className="text-white/80 mb-6">Manage admin users.</p>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name, id, or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 w-full max-w-md px-4 py-2 rounded-md bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full text-white border-collapse border border-white/20">
          <thead>
            <tr className="bg-white/10">
              <th className="border border-white/20 px-4 py-2 text-left">Name</th>
              <th className="border border-white/20 px-4 py-2 text-left">Email</th>
              <th className="border border-white/20 px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.length > 0 ? (
              filteredAdmins.map(({ id, name, email, status }) => (
                <tr key={id} className="hover:bg-white/10 transition-colors">
                  <td className="border border-white/20 px-4 py-2">{name}</td>
                  <td className="border border-white/20 px-4 py-2">{email}</td>
                  <td
                    className={`border border-white/20 px-4 py-2 ${
                      status === 'Suspended' ? 'text-red-400' : 'text-green-400'
                    }`}
                  >
                    {status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-6 text-white/60">
                  No admins found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
