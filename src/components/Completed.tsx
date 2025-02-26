import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  status: string;
  mark_as_important?: boolean; // Optional property
}

const Completed: React.FC = () => {
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchCompletedTodos();
  }, []);

  const fetchCompletedTodos = async () => {
    try {
      const response = await api.get('/todo/', {
        params: { completed: true }, // Fetch only completed todos
      });
      setCompletedTodos(response.data);
    } catch (error) {
      console.error('Failed to fetch completed todos:', error);
    }
  };

  return (
    <div className="flex">
      <div className="bg-white p-6 rounded shadow-md flex-1">
        <h2 className="text-3xl text-black mb-4 font-bold">Completed</h2>

        {/* Table Structure */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Task Name</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {completedTodos.length > 0 ? (
              completedTodos.map((todo) => (
                <tr
                  key={todo.id}
                  className="border-b border-gray-200 bg-blue-200 hover:bg-blue-400 transition-colors"
                >
                  <td className="p-2 flex items-center">
                    <span className="line-through text-gray-500">{todo.title}</span>
                  </td>
                  <td className="p-2">
                    <span>{todo.status}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="p-2 text-center">
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
