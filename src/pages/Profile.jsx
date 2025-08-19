import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    status: 'Active',
    avatarUrl: 'https://i.pravatar.cc/500?img=32',
  };

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const handleLogout = () => {
    alert('Logged out!');
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white/10 rounded-lg shadow-lg text-white relative">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="flex items-center space-x-8 mb-8">
        <img
          src={user.avatarUrl}
          alt="User Avatar"
          onClick={toggleModal}
          className="w-40 h-40 rounded-full border-4 border-blue-600 cursor-pointer hover:opacity-90 transition"
        />
        <div>
          <p className="text-2xl font-semibold">{user.name}</p>
          <p className="text-lg text-white/80">{user.email}</p>
          <p className="mt-2 px-3 py-1 inline-block rounded-full bg-green-600 text-white text-sm font-medium">
            {user.status}
          </p>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          onClick={handleEditProfile}
          className="px-6 py-2 bg-blue-600 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Edit Profile
        </button>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-600 rounded-md font-semibold hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={user.avatarUrl}
              alt="Full Avatar"
              className="max-w-[90vw] max-h-[90vh] rounded-lg"
            />
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
