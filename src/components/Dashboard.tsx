import React, { useEffect, useState } from 'react';
import { getDashboard } from '../services/api';
import { logout } from '../services/api';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const Dashboard: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getDashboard();
        console.log('API response:', response);
        setMessage(response.data.response);
      } catch (error) {
        console.error('Failed to fetch dashboard', error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="min-h-screen flex items-center justify-center bg-gray-100 flex-1">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl mb-4">Dashboard</h2>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;