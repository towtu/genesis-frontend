import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

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
    <div className="flex">
      <div className="bg-white p-6 rounded shadow-md flex-1">
        <h2 className="text-3xl text-black mb-4 font-bold">Important</h2>

        {/* Table Structure */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Task Name</th>
              <th className="p-2 text-left">Due Date</th> {/* Replaced Status with Due Date */}
            </tr>
          </thead>
          <tbody>
            {importantTodos.length > 0 ? (
              importantTodos.map((todo) => (
                <tr
                  key={todo.id}
                  className="border-b border-gray-200 bg-blue-200 hover:bg-blue-400 transition-colors"
                >
                  <td className="p-2 flex items-center">
                    <span>{todo.title}</span>
                  </td>
                  <td className="p-2">
                    <span>{todo.due_date ? formatDate(todo.due_date) : 'No due date'}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="p-2 text-center">
                  You have nothing important to do.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Important;
