// src/components/TodoList.tsx
import React, { useEffect, useState } from 'react';
import { getTodos } from '../services/api';

const TodoList: React.FC<{ userId: number }> = ({ userId }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await getTodos(userId);
        setTodos(response.data);
      } catch (error) {
        console.error('Failed to fetch todos', error);
      }
    };

    fetchTodos();
  }, [userId]);

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl mb-4">Todo List</h2>
      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id} className="mb-2">
            <span className={todo.completed ? 'line-through' : ''}>{todo.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;