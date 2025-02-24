// src/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../services/api';

const Sidebar: React.FC = () => {
  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <Link to="/dashboard" className="hover:text-gray-400">
              Home
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/todos" className="hover:text-gray-400">
              Todos
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/profile" className="hover:text-gray-400">
              Profile
            </Link>
          </li>
        </ul>
      </nav>
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 mt-6"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;