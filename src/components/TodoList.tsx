import React from 'react';
import { Plus, Star, Edit, Trash } from 'lucide-react';
import { useTheme } from './ThemeContext';
import useTodos from '../hooks/useTodos';
import useCreate from '../hooks/useCreate';
import useDelete from '../hooks/useDelete';

const TodoList: React.FC = () => {
  const { theme } = useTheme();
  const {
    todos,
    editingTodoId,
    editedTitle,
    setEditedTitle,
    editedDueDate,
    setEditedDueDate,
    editedStatus,
    setEditedStatus,
    fetchTodos,
    handleEditClick,
    handleCancelEdit,
    handleSaveClick,
    handleToggleCompleted,
    handleMarkAsImportant,
    formatDate,
  } = useTodos();

  const {
    newTodoTitle,
    setNewTodoTitle,
    newTodoDueDate,
    setNewTodoDueDate,
    newTodoStatus,
    setNewTodoStatus,
    isInputEnabled,
    handleEnableInput,
    handleCancelCreate,
    handleAddTodo,
    errorMessage, // Destructure error message
  } = useCreate();

  const { handleDeleteClick } = useDelete();

  return (
    <div className={`flex ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className={`p-6 rounded shadow-md flex-1 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-2xl mb-4">Todo List</h2>
        <div className="flex gap-2 mb-4">
          {!isInputEnabled ? (
            <button
              onClick={handleEnableInput}
              className={`border ${
                theme === 'dark' ? 'border-blue-400 text-blue-400' : 'border-blue-600 text-blue-600'
              } flex gap-1 px-4 py-2 rounded`}
            >
              <Plus size={20} className="mt-0.5" />
              <span>New Task</span>
            </button>
          ) : (
            <>
              <input
                type="text"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
                placeholder="Enter new todo..."
                className={`border ${
                  theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'
                } p-2 rounded flex-1`}
              />
              <input
                type="datetime-local"
                value={newTodoDueDate}
                onChange={(e) => setNewTodoDueDate(e.target.value)}
                className={`border ${
                  theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'
                } p-2 rounded`}
              />
              <select
                value={newTodoStatus}
                onChange={(e) => setNewTodoStatus(e.target.value)}
                className={`border ${
                  theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'
                } p-2 rounded`}
              >
                <option value="not_started">Not Started</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <button
                onClick={() => handleAddTodo(fetchTodos)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={handleCancelCreate}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          )}
        </div>

        {/* Display error message if any */}
        {errorMessage && (
          <div className="text-red-500 mb-4">
            {errorMessage}
          </div>
        )}

        {/* Table Structure */}
        <table className="w-full border-collapse">
          <thead>
            <tr className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <th className="p-2 text-left">Task Name</th>
              <th className="p-2 text-left">Due Date</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr
                key={todo.id}
                className={`border-b ${
                  theme === 'dark' ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' : 'border-gray-200 bg-blue-200 hover:bg-blue-400'
                } transition-colors`}
              >
                <td className="p-2 flex items-center">
                  {editingTodoId === todo.id ? (
                    <>
                      <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className={`border ${
                          theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'
                        } p-2 rounded w-full`}
                      />
                    </>
                  ) : (
                    <>
                      {/* Checkbox for Completion */}
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggleCompleted(todo.id, todo.completed)}
                        className="mr-2"
                      />
                      <span
                        className={`${todo.completed ? 'line-through text-gray-500' : ''}`}
                        onClick={() => handleEditClick(todo)}
                      >
                        {todo.title}
                      </span>
                    </>
                  )}
                </td>
                <td className="p-2">
                  {editingTodoId === todo.id ? (
                    <input
                      type="datetime-local"
                      value={editedDueDate}
                      onChange={(e) => setEditedDueDate(e.target.value)}
                      className={`border ${
                        theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'
                      } p-2 rounded w-full`}
                    />
                  ) : (
                    <span>{todo.due_date ? formatDate(todo.due_date) : 'No due date'}</span>
                  )}
                </td>
                <td className="p-2">
                  {editingTodoId === todo.id ? (
                    <select
                      value={editedStatus}
                      onChange={(e) => setEditedStatus(e.target.value)}
                      className={`border ${
                        theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'
                      } p-2 rounded w-full`}
                    >
                      <option value="not_started">Not Started</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  ) : (
                    <span>{todo.status}</span>
                  )}
                </td>
                <td className="p-2 flex gap-2">
                  {editingTodoId === todo.id ? (
                    <>
                      <button
                        onClick={() => handleSaveClick(todo.id)}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-500 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Edit Button */}
                      <button
                        onClick={() => handleEditClick(todo)}
                        className={`${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                      >
                        <Edit size={20} />
                      </button>
                      {/* Star Button */}
                      <button
                        onClick={() => handleMarkAsImportant(todo.id)}
                        className={`${todo.mark_as_important ? 'text-yellow-500' : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} hover:text-yellow-600`}
                      >
                        <Star size={20} />
                      </button>
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteClick(todo.id, fetchTodos)}
                        className={`${theme === 'dark' ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'}`}
                      >
                        <Trash size={20} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoList;