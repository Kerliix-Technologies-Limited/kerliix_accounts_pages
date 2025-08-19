import React from 'react';

export default function Profile() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Personal Information</h1>

      <div className="space-y-6">
        {/* Mock profile section */}
        <div className="bg-white/10 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-blue-300">Profile</h2>
          <div className="mt-2 text-gray-300 space-y-1">
            <p><strong>Name:</strong> Jane Doe</p>
            <p><strong>Email:</strong> jane.doe@example.com</p>
            <p><strong>Phone:</strong> +1 234 567 8901</p>
          </div>
        </div>

        {/* Mock editable info */}
        <div className="bg-white/10 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-blue-300">Basic Details</h2>
          <div className="mt-2 text-gray-300 space-y-1">
            <p><strong>Birthday:</strong> January 1, 1990</p>
            <p><strong>Gender:</strong> Female</p>
            <p><strong>Language:</strong> English</p>
          </div>
        </div>
      </div>
    </div>
  );
}
