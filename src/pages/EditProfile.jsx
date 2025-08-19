import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    status: 'Active',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Implement save logic here
    alert('Profile updated!');
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white/10 rounded-lg shadow-lg text-white">
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-md bg-white/20 px-4 py-2 text-white focus:outline-none border border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-md bg-white/20 px-4 py-2 text-white focus:outline-none border border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-md bg-white/20 px-4 py-2 text-white focus:outline-none border border-blue-500"
          >
            <option>Active</option>
            <option>Inactive</option>
            <option>Suspended</option>
            <option>Deactivated</option>
          </select>
        </div>

        <div className="pt-4 flex gap-4">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-green-600 rounded-md font-semibold hover:bg-green-700 transition"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-6 py-2 bg-red-600 rounded-md font-semibold hover:bg-red-700 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
