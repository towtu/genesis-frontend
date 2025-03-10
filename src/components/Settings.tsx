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
import { useMutation } from "@tanstack/react-query"; // Import useMutation
import Swal from "sweetalert2"; // For confirmation alert

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme(); // Get theme from ThemeContext
  const [isChangingPassword, setIsChangingPassword] = useState(false); // Toggle password change form
  const [currentPassword, setCurrentPassword] = useState(""); // Current password input
  const [newPassword, setNewPassword] = useState(""); // New password input
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm new password input
  const [error, setError] = useState(""); // Error message

  // TanStack Query Mutation for changing password
  const changePasswordMutation = useMutation({
    mutationFn: async (passwords: { currentPassword: string; newPassword: string }) => {
      const response = await api.put("/change-password/", {
        current_password: passwords.currentPassword,
        new_password: passwords.newPassword,
      });
      return response.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Password changed successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setError("");
      setIsChangingPassword(false); // Hide the password change form
    },
    onError: (error: any) => {
      console.error("Failed to change password:", error);
      setError("Failed to change password. Please check your current password.");
    },
  });

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    // Confirmation alert before changing password
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to change your password.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Trigger the mutation
        changePasswordMutation.mutate({ currentPassword, newPassword });
      }
    });
  };

  return (
    <div className={`flex min-h-full justify-center items-center p-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
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
            </div>
          </div>

          </div>
        </div>
      </div>
  );
};

export default Settings;
