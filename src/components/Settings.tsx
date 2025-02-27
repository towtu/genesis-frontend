import React, { useState } from "react";
import { api } from "../services/api";
import Sidebar from "./Sidebar";

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    theme: "light",
  });

  const [isChangingPassword, setIsChangingPassword] = useState(false); // Toggle password change form
  const [currentPassword, setCurrentPassword] = useState(""); // Current password input
  const [newPassword, setNewPassword] = useState(""); // New password input
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm new password input
  const [error, setError] = useState(""); // Error message

  const handleSaveSettings = async () => {
    try {
      await api.put("/settings/", settings);
      alert("Settings updated successfully!");
    } catch (error) {
      console.error("Failed to update settings:", error);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      const response = await api.put("/change-password/", {
        current_password: currentPassword,
        new_password: newPassword,
      });
      alert("Password changed successfully!");
      setError("");
      setIsChangingPassword(false); // Hide the password change form
    } catch (error) {
      console.error("Failed to change password:", error);
      setError("Failed to change password. Please check your current password.");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex min-h-screen">
        <div className="flex-1 p-8 bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>

            {/* Notification Settings */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Notification Settings</h3>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) =>
                      setSettings({ ...settings, notifications: e.target.checked })
                    }
                    className="mr-2"
                  />
                  Enable Notifications
                </label>
              </div>
            </div>

            {/* Theme Settings */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Theme Settings</h3>
              <div className="mb-4">
                <label>
                  Theme:
                  <select
                    value={settings.theme}
                    onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                    className="ml-2 p-2 border border-gray-300 rounded-md"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </label>
              </div>
            </div>

            {/* Save Settings Button */}
            <button
              onClick={handleSaveSettings}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-8"
            >
              Save Settings
            </button>

            {/* Change Password Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Change Password</h3>

              {/* Toggle Password Change Form */}
              {!isChangingPassword ? (
                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Change Password
                </button>
              ) : (
                <div className="space-y-4">
                  {/* Current Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Error Message */}
                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  {/* Save Password Button */}
                  <button
                    onClick={handleChangePassword}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Save Password
                  </button>

                  {/* Cancel Button */}
                  <button
                    onClick={() => setIsChangingPassword(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 ml-2"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
