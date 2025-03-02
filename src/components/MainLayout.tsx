import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const MainLayout: React.FC = () => {
  return (
    <div className="flex">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Fixed Navbar */}
        <Navbar />

        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto p-4 mt-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
