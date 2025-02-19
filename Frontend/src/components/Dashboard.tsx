import React, { useEffect, useState } from 'react';
import { getDashboard } from '../services/api';
import { logout } from '../services/api';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getDashboard();
        console.log('API response:', response); // Log the API response
        setMessage(response.data.response);
      } catch (error) {
        console.error('Failed to fetch dashboard', error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <>
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
              <Link to="/todos/:userId" className="hover:text-gray-400">
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl mb-4">Dashboard</h2>
          <p>{message}</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;