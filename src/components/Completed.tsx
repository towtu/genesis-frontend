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
      // Add unique completedDate to each todo
      const todosWithCompletedDate = response.data.map((todo: Todo, index: number) => ({
        ...todo,
        completedDate: new Date(new Date().setDate(new Date().getDate() - index)).toISOString(), // Simulate unique completed date
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
      <div className={`p-6 rounded shadow-md flex-1 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-3xl mb-4 font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Completed</h2>

        {/* Table Structure */}
        <table className="w-full border-collapse">
          <thead>
            <tr className={`${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
              <th className="p-2 text-left">Task Name</th>
              <th className="p-2 text-left">Completed Date</th> {/* New Column */}
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
                  <td className="p-2 flex items-center">
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
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-black'}>{todo.status}</span>
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
    </div>
  );
};

export default Completed;
