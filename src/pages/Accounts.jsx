import React, { useState } from 'react';

const mockUsers = [
  { id: 1, username: 'kaggwaj', name: 'Joseph Kaggwa', email: 'joseph@example.com', status: 'Active' },
  { id: 2, username: 'nakiyob', name: 'Brenda Nakiyo', email: 'brenda@example.com', status: 'Active' },
  { id: 3, username: 'mugishac', name: 'Charles Mugisha', email: 'charles@example.com', status: 'Suspended' },
  { id: 4, username: 'namugalel', name: 'Lydia Namugala', email: 'lydia@example.com', status: 'Active' },
  { id: 5, username: 'sebatg', name: 'Grace Sebatindira', email: 'grace@example.com', status: 'Active' },
  { id: 6, username: 'kisakyeo', name: 'Oscar Kisakye', email: 'oscar@example.com', status: 'Suspended' },
  { id: 7, username: 'namatovuh', name: 'Hellen Namatovu', email: 'hellen@example.com', status: 'Active' },
  { id: 8, username: 'kintuam', name: 'Andrew Kintu', email: 'andrew@example.com', status: 'Active' },
  { id: 9, username: 'nakkuivc', name: 'Catherine Nakku', email: 'catherine@example.com', status: 'Active' },
  { id: 10, username: 'luwagab', name: 'Brian Luwaga', email: 'brian@example.com', status: 'Suspended' },
  { id: 11, username: 'namuddukg', name: 'Karen Namuddu', email: 'karen@example.com', status: 'Active' },
  { id: 12, username: 'ssewanyanam', name: 'Michael Ssewanyana', email: 'michael@example.com', status: 'Active' },
  { id: 13, username: 'nakiggaw', name: 'Winfred Nakigga', email: 'winfred@example.com', status: 'Active' },
  { id: 14, username: 'matovund', name: 'Daniel Matovu', email: 'daniel@example.com', status: 'Suspended' },
  { id: 15, username: 'namatovup', name: 'Patricia Namatovu', email: 'patricia@example.com', status: 'Active' },
  { id: 16, username: 'kawalayw', name: 'Yusuf Kawalya', email: 'yusuf@example.com', status: 'Active' },
  { id: 17, username: 'nakazibof', name: 'Florence Nakazibwe', email: 'florence@example.com', status: 'Active' },
  { id: 18, username: 'nakabugog', name: 'Gloria Nakabugo', email: 'gloria@example.com', status: 'Active' },
  { id: 19, username: 'sebalwaj', name: 'John Sebalwa', email: 'john@example.com', status: 'Suspended' },
  { id: 20, username: 'namiremuf', name: 'Fiona Namiremu', email: 'fiona@example.com', status: 'Active' },
];

export default function Accounts() {
  const [users] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter users by id, name, email, or username
  const filteredUsers = users.filter(({ id, name, email, username }) => {
    const term = searchTerm.toLowerCase();
    return (
      id.toString().includes(term) ||
      name.toLowerCase().includes(term) ||
      email.toLowerCase().includes(term) ||
      (username && username.toLowerCase().includes(term))
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-4">User Accounts</h1>
      <p className="text-white/80 mb-6">
        Manage user accounts.
      </p>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name, id, email, or username..."
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
            {filteredUsers.length > 0 ? (
              filteredUsers.map(({ id, name, email, status }) => (
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
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
