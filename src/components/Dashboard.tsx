import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTodos } from '../services/api';
import { useTheme } from './ThemeContext'; // Import useTheme

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  due_date?: string | null;
  status?: string;
  date?: string | null;
  mark_as_important?: boolean;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [upcomingTodos, setUpcomingTodos] = useState<Todo[]>([]);
  const { theme } = useTheme(); // Get the current theme

  useEffect(() => {
    fetchUpcomingTodos();
  }, []);

  const fetchUpcomingTodos = async () => {
    try {
      const todos = await getTodos(); // Directly get the array of todos
      if (!todos) throw new Error('Failed to fetch todos');

      const now = new Date();
      const upcoming = todos
        .filter((todo: Todo) => {
          // Handle undefined and null due_date
          if (todo.due_date === undefined || todo.due_date === null) return false;
          return new Date(todo.due_date) > now;
        })
        .sort((a: Todo, b: Todo) => {
          // Ensure due_date is not null or undefined before creating Date objects
          const dateA = a.due_date ? new Date(a.due_date).getTime() : 0;
          const dateB = b.due_date ? new Date(b.due_date).getTime() : 0;
          return dateA - dateB;
        })
        .slice(0, 5); // Limit to 5 upcoming todos

      setUpcomingTodos(upcoming);
    } catch (error) {
      console.error('Failed to fetch upcoming todos', error);
      setUpcomingTodos([]); // Prevent crashes
    }
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'No due date'; // Handle null and undefined cases
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`flex min-h-full ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`p-6 rounded shadow-md flex-1 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-2xl mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Dashboard</h2>

        {/* Navigation Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div
            onClick={() => navigate('/important')}
            className={`p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-blue-100'
            }`}
          >
            <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-blue-800'}`}>Important</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>View important tasks</p>
          </div>
          <div
            onClick={() => navigate('/completed')}
            className={`p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-green-100'
            }`}
          >
            <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-green-800'}`}>Completed</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>View completed tasks</p>
          </div>
          <div
            onClick={() => navigate('/todos')}
            className={`p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-yellow-100'
            }`}
          >
            <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-yellow-800'}`}>To-do</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>View all tasks</p>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className={`p-6 rounded-lg shadow-sm ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Upcoming Events</h3>
          {upcomingTodos.length > 0 ? (
            <ul className="space-y-3">
              {upcomingTodos.map((todo) => (
                <li
                  key={todo.id}
                  className={`p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                    theme === 'dark' ? 'bg-gray-600' : 'bg-white'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{todo.title}</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Due: {formatDate(todo.due_date)}</p>
                    </div>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>{todo.status}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>No upcoming events.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;