import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useTheme } from './ThemeContext'; // Import useTheme

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  due_date: string | null;
  status: string;
  mark_as_important?: boolean; // Optional property
}

const Important: React.FC = () => {
  const [importantTodos, setImportantTodos] = useState<Todo[]>([]);
  const { theme } = useTheme(); // Get the current theme

  useEffect(() => {
    fetchImportantTodos();
  }, []);

  const fetchImportantTodos = async () => {
    try {
      const response = await api.get('/todo/');
      const filteredTodos = response.data.filter((todo: Todo) => todo.mark_as_important);
      setImportantTodos(filteredTodos);
    } catch (error) {
      console.error('Failed to fetch important todos:', error);
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
        <h2 className={`text-3xl mb-4 font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Important</h2>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <th className="p-2 text-left">Task Name</th>
                <th className="p-2 text-left">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {importantTodos.length > 0 ? (
                importantTodos.map((todo) => (
                  <tr
                    key={todo.id}
                    className={`border-b ${
                      theme === 'dark' ? 'border-gray-700 bg-gray-600 hover:bg-gray-500' : 'border-gray-200 bg-blue-200 hover:bg-blue-400'
                    } transition-colors`}
                  >
                    <td className="p-2">
                      <span className={theme === 'dark' ? 'text-white' : 'text-black'}>{todo.title}</span>
                    </td>
                    <td className="p-2">
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-black'}>
                        {todo.due_date ? formatDate(todo.due_date) : 'No due date'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className={`p-2 text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                    You have nothing important to do.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3">
          {importantTodos.length > 0 ? (
            importantTodos.map((todo) => (
              <div
                key={todo.id}
                className={`rounded-lg p-3 border ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-200'
                }`}
              >
                <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{todo.title}</span>
                <div className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Due: {todo.due_date ? formatDate(todo.due_date) : 'No due date'}
                </div>
              </div>
            ))
          ) : (
            <p className={`text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
              You have nothing important to do.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Important;
