import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTodos } from '../services/api';
import Sidebar from './Sidebar';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [upcomingTodos, setUpcomingTodos] = useState<any[]>([]);

  useEffect(() => {
    fetchUpcomingTodos();
  }, []);

  const fetchUpcomingTodos = async () => {
    try {
      const response = await getTodos();
      if (!response || !response.data) throw new Error('Invalid API response');

      const now = new Date();
      const upcoming = response.data
        .filter((todo: any) => todo.due_date && new Date(todo.due_date) > now)
        .sort((a: any, b: any) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())
        .slice(0, 5); // Limit to 5 upcoming todos

      setUpcomingTodos(upcoming);
    } catch (error) {
      console.error('Failed to fetch upcoming todos', error);
      setUpcomingTodos([]); // Prevent crashes
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No due date";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Invalid date" : date.toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div className="flex">
    <Sidebar/>
      <div className="bg-white p-6 rounded shadow-md flex-1">
        <h2 className="text-2xl text-black mb-4">Dashboard</h2>

        {/* Navigation Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div onClick={() => navigate('/important')}
            className="p-6 bg-blue-100 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <h3 className="text-xl font-semibold text-blue-800">Important</h3>
            <p className="text-gray-600">View important tasks</p>
          </div>
          <div onClick={() => navigate('/completed')}
            className="p-6 bg-green-100 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <h3 className="text-xl font-semibold text-green-800">Completed</h3>
            <p className="text-gray-600">View completed tasks</p>
          </div>
          <div onClick={() => navigate('/todos')}
            className="p-6 bg-yellow-100 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <h3 className="text-xl font-semibold text-yellow-800">To-do</h3>
            <p className="text-gray-600">View all tasks</p>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Events</h3>
          {upcomingTodos.length > 0 ? (
            <ul className="space-y-3">
              {upcomingTodos.map((todo) => (
                <li key={todo.id} className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-medium text-gray-800">{todo.title}</p>
                      <p className="text-sm text-gray-500">Due: {formatDate(todo.due_date)}</p>
                    </div>
                    <span className="text-sm text-gray-500">{todo.status}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No upcoming events.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
