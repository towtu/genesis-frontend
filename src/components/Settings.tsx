import React, { useState } from "react";
import { api } from "../services/api";
import { useTheme } from "./ThemeContext"; // Import useTheme
import { Moon, Sun } from "lucide-react"; // Icons for theme options
import { Button } from "@/components/ui/button"; // Adjust the import path
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Adjust the import path

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme(); // Get theme from ThemeContext
  const [isChangingPassword, setIsChangingPassword] = useState(false); // Toggle password change form
  const [currentPassword, setCurrentPassword] = useState(""); // Current password input
  const [newPassword, setNewPassword] = useState(""); // New password input
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm new password input
  const [error, setError] = useState(""); // Error message

  const handleSaveTheme = async () => {
    try {
      await api.put("/settings/", { theme }); // Save the theme
      alert("Theme updated successfully!");
    } catch (error) {
      console.error("Failed to update theme:", error);
      alert("Failed to update theme. Please try again.");
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
    <div className={`flex min-h-full justify-center items-center p-8`}>
      <div className={`w-full max-w-4xl p-8 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <h2 className="text-2xl font-bold mb-6 text-center">Settings</h2>

        {/* Grid Layout for Side-by-Side Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Theme Settings */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Theme Settings</h3>
            <div className="flex items-center gap-4">
              {/* Dropdown Menu for Theme Selection */}
              <div className="flex-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {theme === "light" && <Sun className="h-4 w-4 mr-2" />}
                      {theme === "dark" && <Moon className="h-4 w-4 mr-2" />}
                      {theme === "light" && "Light"}
                      {theme === "dark" && "Dark"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      <Sun className="h-4 w-4 mr-2" />
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      <Moon className="h-4 w-4 mr-2" />
                      Dark
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Save Theme Button */}
              <button
                onClick={handleSaveTheme}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 whitespace-nowrap"
              >
                Save Theme
              </button>
            </div>
          </div>

          {/* Change Password Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Change Password</h3>

            {/* Toggle Password Change Form */}
            {!isChangingPassword ? (
              <button
                onClick={() => setIsChangingPassword(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
              >
                Change Password
              </button>
            ) : (
              <div className="space-y-4">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className={`mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'
                    }`}
                  />
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'
                    }`}
                  />
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-sm font-medium">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'
                    }`}
                  />
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 text-sm">{error}</p>}

                {/* Save Password Button */}
                <button
                  onClick={handleChangePassword}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
                >
                  Save Password
                </button>

                {/* Cancel Button */}
                <button
                  onClick={() => setIsChangingPassword(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 w-full mt-2"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
