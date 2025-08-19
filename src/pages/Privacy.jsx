import React from 'react';

export default function Privacy() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Privacy Settings</h1>

      <div className="space-y-6">
        {/* Web Activity */}
        <div className="bg-white/10 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-blue-300">Web & App Activity</h2>
          <p className="text-gray-300 mt-1">
            Tracks your searches, activity in apps, and websites to improve experience.
          </p>
          <button className="mt-2 px-4 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded">
            Manage Activity
          </button>
        </div>

        {/* Location History */}
        <div className="bg-white/10 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-blue-300">Location History</h2>
          <p className="text-gray-300 mt-1">
            Saves your device location to show useful info like commute times and places visited.
          </p>
          <button className="mt-2 px-4 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded">
            View Timeline
          </button>
        </div>

        {/* Ad Personalization */}
        <div className="bg-white/10 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-blue-300">Ad Personalization</h2>
          <p className="text-gray-300 mt-1">
            Customize the ads you see based on your interests and activity.
          </p>
          <button className="mt-2 px-4 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded">
            Adjust Ad Settings
          </button>
        </div>
      </div>
    </div>
  );
}
