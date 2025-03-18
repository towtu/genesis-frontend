import React, { useState } from "react";
import { api } from "../services/api";
import { useTheme } from "./ThemeContext"; // Import useTheme

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  due_date: string | null; // Add due_date
  status: string; // Add status
}

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Todo[]>([]);
  const { theme } = useTheme(); // Get the current theme

  const handleSearch = async () => {
    try {
      const response = await api.get(`/todo/?search=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Failed to fetch search results:", error);
    }
  };

  // Format the due date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No due date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={`flex min-h-full w-full justify-center items-center p-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`p-8 rounded-lg shadow-lg min-w-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-2xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Search</h2>

        {/* Search Input and Button */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search todos..."
            className={`flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'
            }`}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 ? (
          <ul className="space-y-2">
            {searchResults.map((todo) => (
              <li
                key={todo.id}
                className={`p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-white'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`${todo.completed ? 'line-through text-gray-500' : ''} ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}>
                    {todo.title}
                  </span>
                  <div className="flex gap-4">
                    {/* Due Date */}
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                      Due: {formatDate(todo.due_date)}
                    </span>
                    {/* Status */}
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                      Status: {todo.status}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={`text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;