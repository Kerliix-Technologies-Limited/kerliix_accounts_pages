import React, { useState } from 'react';

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [autoLogout, setAutoLogout] = useState('15');
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);
  const [timezone, setTimezone] = useState('UTC');

  return (
    <div className="p-6 max-w-3xl text-white">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <p className="text-white/80 mb-8">
        Manage your preferences, notifications, and account settings.
      </p>

      <div className="space-y-6">
        {/* Email Notifications */}
        <ToggleSetting
          label="Email Notifications"
          enabled={emailNotifications}
          onChange={() => setEmailNotifications(!emailNotifications)}
        />

        {/* Push Notifications */}
        <ToggleSetting
          label="Push Notifications"
          enabled={pushNotifications}
          onChange={() => setPushNotifications(!pushNotifications)}
        />

        {/* Theme */}
        <SelectSetting
          label="Theme"
          value={theme}
          options={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'system', label: 'System Default' },
          ]}
          onChange={(e) => setTheme(e.target.value)}
        />

        {/* Language */}
        <SelectSetting
          label="Language"
          value={language}
          options={[
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Spanish' },
            { value: 'de', label: 'German' },
            { value: 'fr', label: 'French' },
          ]}
          onChange={(e) => setLanguage(e.target.value)}
        />

        {/* Auto-logout Timeout */}
        <SelectSetting
          label="Auto-logout Timeout (minutes)"
          value={autoLogout}
          options={[
            { value: '5', label: '5' },
            { value: '15', label: '15' },
            { value: '30', label: '30' },
            { value: '60', label: '60' },
          ]}
          onChange={(e) => setAutoLogout(e.target.value)}
        />

        {/* Two-Factor Authentication */}
        <ToggleSetting
          label="Two-Factor Authentication"
          enabled={twoFactorAuth}
          onChange={() => setTwoFactorAuth(!twoFactorAuth)}
        />

        {/* Privacy Mode */}
        <ToggleSetting
          label="Privacy Mode"
          enabled={privacyMode}
          onChange={() => setPrivacyMode(!privacyMode)}
        />

        {/* Data Sharing Consent */}
        <ToggleSetting
          label="Data Sharing Consent"
          enabled={dataSharing}
          onChange={() => setDataSharing(!dataSharing)}
        />

        {/* Timezone */}
        <SelectSetting
          label="Timezone"
          value={timezone}
          options={[
            { value: 'UTC', label: 'UTC' },
            { value: 'PST', label: 'Pacific Standard Time (PST)' },
            { value: 'EST', label: 'Eastern Standard Time (EST)' },
            { value: 'CET', label: 'Central European Time (CET)' },
            // add more as needed
          ]}
          onChange={(e) => setTimezone(e.target.value)}
        />
      </div>
    </div>
  );
}

function ToggleSetting({ label, enabled, onChange }) {
  return (
    <div className="flex items-center justify-between bg-white/10 p-4 rounded-lg">
      <label className="font-semibold">{label}</label>
      <input
        type="checkbox"
        checked={enabled}
        onChange={onChange}
        className="w-5 h-5 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-400"
      />
    </div>
  );
}

function SelectSetting({ label, value, options, onChange }) {
  return (
    <div className="bg-white/10 p-4 rounded-lg">
      <label className="block font-semibold mb-2">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {options.map(({ value: optValue, label: optLabel }) => (
          <option key={optValue} value={optValue}>
            {optLabel}
          </option>
        ))}
      </select>
    </div>
  );
}
