import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useTheme } from './ThemeContext'; // Import useTheme

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  status: string;
  mark_as_important?: boolean; // Optional property
  completedDate?: string; // Add completedDate field
}

const Completed: React.FC = () => {
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const { theme } = useTheme(); // Get the current theme

  useEffect(() => {
    fetchCompletedTodos();
  }, []);

  const fetchCompletedTodos = async () => {
    try {
      const response = await api.get('/todo/', {
        params: { completed: true }, // Fetch only completed todos
      });
      // Add completedDate to each todo if it doesn't exist
      const todosWithCompletedDate = response.data.map((todo: Todo) => ({
        ...todo,
        completedDate: todo.completedDate || new Date().toISOString(), // Simulate completed date
      }));
      setCompletedTodos(todosWithCompletedDate);
    } catch (error) {
      console.error('Failed to fetch completed todos:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`flex min-h-full ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`p-4 sm:p-6 rounded shadow-md flex-1 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-3xl mb-4 font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Completed</h2>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className={`${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
                <th className="p-2 text-left">Task Name</th>
                <th className="p-2 text-left">Completed Date</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {completedTodos.length > 0 ? (
                completedTodos.map((todo) => (
                  <tr
                    key={todo.id}
                    className={`border-b ${
                      theme === 'dark' ? 'border-gray-700 bg-gray-600 hover:bg-gray-500' : 'border-gray-200 bg-blue-200 hover:bg-blue-400'
                    } transition-colors`}
                  >
                    <td className="p-2">
                      <span className={`line-through ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                        {todo.title}
                      </span>
                    </td>
                    <td className="p-2">
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-black'}>
                        {todo.completedDate ? formatDate(todo.completedDate) : 'N/A'}
                      </span>
                    </td>
                    <td className="p-2">
                      <span className={`capitalize ${theme === 'dark' ? 'text-gray-300' : 'text-black'}`}>{todo.status.replace(/_/g, ' ')}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className={`p-2 text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                    No completed todos found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3">
          {completedTodos.length > 0 ? (
            completedTodos.map((todo) => (
              <div
                key={todo.id}
                className={`rounded-lg p-3 border ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-200'
                }`}
              >
                <span className={`line-through font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                  {todo.title}
                </span>
                <div className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} flex flex-wrap gap-3`}>
                  <span>{todo.completedDate ? formatDate(todo.completedDate) : 'N/A'}</span>
                  <span className="capitalize">{todo.status.replace(/_/g, ' ')}</span>
                </div>
              </div>
            ))
          ) : (
            <p className={`text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
              No completed todos found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Completed;
