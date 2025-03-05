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
} from "lucide-react";
import { logout } from "../services/api";


const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className={`bg-blue-200 w-64 h-screen fixed left-0 top-0 flex flex-col p-4 dark:bg-gray-800`}>
      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? "bg-blue-300 text-black dark:bg-gray-700 dark:text-white"
                    : "hover:bg-blue-300 dark:hover:bg-gray-700"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Task Items */}
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2 dark:text-gray-300">Tasks</h3>
          <ul className="space-y-1">
            {taskItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? "bg-blue-300 text-black dark:bg-gray-700 dark:text-white"
                      : "hover:bg-blue-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Settings Items */}
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2 dark:text-gray-300">Settings</h3>
          <ul className="space-y-1">
            {settingsItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? "bg-blue-300 text-black dark:bg-gray-700 dark:text-white"
                      : "hover:bg-blue-300 dark:hover:bg-gray-700"
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

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-4 flex items-center gap-2 p-2 rounded-lg hover:bg-blue-300 dark:hover:bg-gray-700 transition-colors"
      >
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
