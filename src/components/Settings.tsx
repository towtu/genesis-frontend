import React, { useState } from "react";
import { useTheme } from "./ThemeContext";
import { Moon, Sun, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "../services/api";
import Swal from "sweetalert2";

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [newUsername, setNewUsername] = useState("");
  const [isChangingUsername, setIsChangingUsername] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleChangeUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim()) return;
    setIsChangingUsername(true);
    try {
      await api.put("/change-username/", { username: newUsername });
      Swal.fire({ title: "Success!", text: "Username changed successfully.", icon: "success" });
      setNewUsername("");
    } catch (error: any) {
      const message = error.response?.data?.detail || "Failed to change username.";
      Swal.fire({ title: "Error", text: message, icon: "error" });
    } finally {
      setIsChangingUsername(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      Swal.fire({ title: "Error", text: "New passwords do not match.", icon: "error" });
      return;
    }
    setIsChangingPassword(true);
    try {
      await api.put("/change-password/", {
        current_password: currentPassword,
        new_password: newPassword,
      });
      Swal.fire({ title: "Success!", text: "Password changed successfully.", icon: "success" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      const message = error.response?.data?.detail || "Failed to change password.";
      Swal.fire({ title: "Error", text: message, icon: "error" });
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className={`flex min-h-full justify-center items-start p-3 sm:p-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`w-full max-w-4xl p-4 sm:p-8 rounded-lg shadow-md space-y-8 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <h2 className="text-2xl font-bold text-center">Settings</h2>

        {/* Theme Settings */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Theme Settings</h3>
          <div className="flex items-center gap-4">
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
          </div>
        </div>

        {/* Change Username */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Change Username</h3>
          <form onSubmit={handleChangeUsername} className="space-y-4 max-w-md">
            <input
              type="text"
              placeholder="New Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              required
            />
            <button
              type="submit"
              disabled={isChangingUsername}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isChangingUsername ? "Changing..." : "Change Username"}
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Change Password</h3>
          <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
            <div className="relative">
              <input
                type={showPasswords ? "text" : "password"}
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={`w-full p-2 border rounded pr-10 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500"
                onClick={() => setShowPasswords(!showPasswords)}
              >
                {showPasswords ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div>
              <input
                type={showPasswords ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                required
              />
            </div>
            <div>
              <input
                type={showPasswords ? "text" : "password"}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full p-2 border rounded ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                required
              />
            </div>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Use 8 or more characters with a mix of letters, numbers & symbols
            </p>
            <button
              type="submit"
              disabled={isChangingPassword}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isChangingPassword ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
