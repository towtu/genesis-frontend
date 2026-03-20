import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  User,
  Search,
  Star,
  CheckCircle,
  ListChecks,
  Calendar,
  Settings,
  HelpCircle,
  LogOut,
  X,
} from "lucide-react";
import { logout } from "../services/api";
import { useTheme } from "./ThemeContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const dark = theme === "dark";

  const menuItems = [
    { name: "Account", path: "/account", icon: <User size={20} /> },
    { name: "Home", path: "/dashboard", icon: <Home size={20} /> },
    { name: "Search", path: "/search", icon: <Search size={20} /> },
  ];

  const taskItems = [
    { name: "Important", path: "/important", icon: <Star size={20} /> },
    { name: "Completed", path: "/completed", icon: <CheckCircle size={20} /> },
    { name: "To-do", path: "/todos", icon: <ListChecks size={20} /> },
  ];

  const settingsItems = [
    { name: "Calendar", path: "/calendar", icon: <Calendar size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
    { name: "Help", path: "/help", icon: <HelpCircle size={20} /> },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleNavClick = () => {
    onClose();
  };

  const linkClass = (path: string) =>
    `flex items-center gap-2 p-2 rounded-lg transition-colors ${
      location.pathname === path
        ? dark
          ? "bg-gray-700 text-white"
          : "bg-blue-300 text-black"
        : dark
        ? "text-gray-200 hover:bg-gray-700 hover:text-white"
        : "text-gray-800 hover:bg-blue-300"
    }`;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          w-64 h-screen fixed left-0 top-0 flex flex-col p-4 z-30
          transform transition-transform duration-300 ease-in-out
          ${dark ? "bg-gray-800" : "bg-blue-200"}
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Mobile close button */}
        <button
          onClick={onClose}
          className={`absolute top-3 right-3 p-1 rounded-lg lg:hidden ${
            dark ? "hover:bg-gray-700 text-gray-300" : "hover:bg-blue-300 text-gray-700"
          }`}
        >
          <X size={20} />
        </button>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto mt-2">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={handleNavClick}
                  className={linkClass(item.path)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <h3 className={`text-sm font-semibold mb-2 ${dark ? "text-gray-400" : "text-gray-700"}`}>Tasks</h3>
            <ul className="space-y-1">
              {taskItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={handleNavClick}
                    className={linkClass(item.path)}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className={`text-sm font-semibold mb-2 ${dark ? "text-gray-400" : "text-gray-700"}`}>Settings</h3>
            <ul className="space-y-1">
              {settingsItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={handleNavClick}
                    className={linkClass(item.path)}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <button
          onClick={handleLogout}
          className={`mt-4 flex items-center gap-2 p-2 rounded-lg transition-colors ${
            dark ? "text-gray-200 hover:bg-gray-700" : "text-gray-800 hover:bg-blue-300"
          }`}
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
