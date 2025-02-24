// Important.tsx
import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import Sidebar from "./Sidebar";

const Important: React.FC = () => {
  const [importantTodos, setImportantTodos] = useState<any[]>([]);

  useEffect(() => {
    const fetchImportantTodos = async () => {
      try {
        const response = await api.get("/todo/");
        const filteredTodos = response.data.filter((todo: any) => todo.mark_as_important);
        setImportantTodos(filteredTodos);
      } catch (error) {
        console.error("Failed to fetch important todos:", error);
      }
    };

    fetchImportantTodos();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex min-h-screen">
        <div className="flex-1 p-8 bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Important</h2>
            {importantTodos.length > 0 ? (
              <ul>
                {importantTodos.map((todo) => (
                  <li key={todo.id} className="mb-2 p-2 border border-gray-200 rounded-md">
                    <span>{todo.title}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>You have nothing important to do.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Important;