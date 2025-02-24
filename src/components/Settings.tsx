import React, { useState } from "react";
import { api } from "../services/api";
import Sidebar from "./Sidebar";

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    theme: "light",
  });

  const handleSave = async () => {
    try {
      await api.put("/settings/", settings);
      alert("Settings updated successfully!");
    } catch (error) {
      console.error("Failed to update settings:", error);
    }
  };

  return (
    <div className="flex">
    <Sidebar/>
        <div className="flex min-h-screen">
        <div className="flex-1 p-8 bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
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
            <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Save Settings
            </button>
            </div>
        </div>
        </div>
    </div>
  );
};

export default Settings;