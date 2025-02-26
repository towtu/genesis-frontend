import React, { useState } from "react";
import { api } from "../services/api";

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async () => {
    try {
      const response = await api.get(`/todo/?search=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Failed to fetch search results:", error);
    }
  };

  return (
    <div className="flex min-h-full w-full justify-center bg-gray-50 items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg min-w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Search</h2>

        {/* Search Input and Button */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search todos..."
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              >
                <span className={todo.completed ? "line-through text-gray-500" : ""}>
                  {todo.title}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
