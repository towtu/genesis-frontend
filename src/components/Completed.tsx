import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import Sidebar from "./Sidebar";

const Completed: React.FC = () => {
  const [completedTodos, setCompletedTodos] = useState<any[]>([]);

  useEffect(() => {
    const fetchCompletedTodos = async () => {
      try {
        const response = await api.get("/todo/?completed=true");
        setCompletedTodos(response.data);
      } catch (error) {
        console.error("Failed to fetch completed todos:", error);
      }
    };

    fetchCompletedTodos();
  }, []);

  return (
    <div className="flex">
    <Sidebar/>
        <div className="flex min-h-screen">
        <div className="flex-1 p-8 bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Completed</h2>
            {completedTodos.length > 0 ? (
                <ul>
                {completedTodos.map((todo) => (
                    <li key={todo.id} className="mb-2 p-2 border border-gray-200 rounded-md">
                    <span className="line-through text-gray-500">{todo.title}</span>
                    </li>
                ))}
                </ul>
            ) : (
                <p>No completed todos found.</p>
            )}
            </div>
        </div>
        </div>
    </div>
  );
};

export default Completed;