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
    <div className="flex">
        <div className="flex min-h-screen w-full">
        <div className="h-screen p-8 bg-gray-100 ">
            <div className="bg-white p-8 -lg shadow-md w-full">
            <h2 className="text-2xl font-bold mb-6">Search</h2>
            <div className="flex gap-2 mb-6">
                <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search todos..."
                className="flex-1 p-2 border border-gray-300 rounded-md"
                />
                <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                Search
                </button>
            </div>

            {searchResults.length > 0 ? (
                <ul>
                {searchResults.map((todo) => (
                    <li key={todo.id} className="mb-2 p-2 border border-gray-200 rounded-md">
                    <span className={todo.completed ? "line-through text-gray-500" : ""}>
                        {todo.title}
                    </span>
                    </li>
                ))}
                </ul>
            ) : (
                <p>No results found.</p>
            )}
            </div>
        </div>
        </div>
    </div>
  );
};

export default Search;
