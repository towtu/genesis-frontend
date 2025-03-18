import React from "react";
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

  return (
    <div className={`flex min-h-full justify-center items-center p-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`w-full max-w-4xl p-8 rounded-lg shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <h2 className="text-2xl font-bold mb-6 text-center">Settings</h2>

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
  );
};

export default Settings;
