import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, User, Search, Star, CheckCircle, ListChecks, Calendar, Settings, HelpCircle, LogOut } from "lucide-react";
import { logout } from "../services/api";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/todos?search=${searchQuery}`);
  };

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
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="bg-blue-200 w-64 min-h-screen p-4 flex flex-col">
      {/* Search ni Boss */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex items-center gap-2 bg-white rounded-lg p-2">
          <Search size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search todos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 outline-none bg-transparent"
          />
        </div>
      </form>

      <nav>
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                  location.pathname === item.path ? "bg-blue-300 text-black" : "hover:bg-blue-300"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <ul className="space-y-1">
            {taskItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                    location.pathname === item.path ? "bg-blue-300 text-black" : "hover:bg-blue-300"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <ul className="space-y-1">
            {settingsItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                    location.pathname === item.path ? "bg-blue-300 text-black" : "hover:bg-blue-300"
                  }`}
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
        className="mt-auto flex items-center gap-2 bg-blue-200 w-64 hover-text-blue-600"
      >
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;