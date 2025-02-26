import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getTodos, createTodo, updateTodo, deleteTodo, markTodoAsImportant } from '../services/api';
import Sidebar from './Sidebar';
import { Plus, Star } from 'lucide-react'; // Import the Star icon

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDueDate, setNewTodoDueDate] = useState('');
  const [newTodoStatus, setNewTodoStatus] = useState('not_started');
  const [isInputEnabled, setIsInputEnabled] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDueDate, setEditedDueDate] = useState('');
  const [editedStatus, setEditedStatus] = useState('not_started');
  const location = useLocation();

  const searchQuery = new URLSearchParams(location.search).get('search') || '';

  useEffect(() => {
    fetchTodos();
  }, [searchQuery]);

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      const filteredTodos = response.data.filter((todo: any) =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setTodos(filteredTodos);
    } catch (error) {
      console.error('Failed to fetch todos', error);
    }
  };

  const handleEnableInput = () => {
    setIsInputEnabled(true);
  };

  const handleCancelCreate = () => {
    setNewTodoTitle('');
    setNewTodoDueDate('');
    setNewTodoStatus('not_started');
    setIsInputEnabled(false);
  };

  const handleAddTodo = async () => {
    if (!newTodoTitle.trim()) return;

    try {
      await createTodo({
        title: newTodoTitle,
        completed: false,
        due_date: newTodoDueDate || null, // Make due_date optional
        status: newTodoStatus,
        date: null, // Make date optional
      });
      setNewTodoTitle('');
      setNewTodoDueDate('');
      setNewTodoStatus('not_started');
      setIsInputEnabled(false);
      fetchTodos();
    } catch (error) {
      console.error('Failed to add todo', error);
    }
  };

  const handleEditClick = (todo: any) => {
    setEditingTodoId(todo.id);
    setEditedTitle(todo.title);
    setEditedDueDate(todo.due_date || '');
    setEditedStatus(todo.status || 'not_started');
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditedTitle('');
    setEditedDueDate('');
    setEditedStatus('not_started');
  };

  const handleSaveClick = async (todoId: number) => {
    try {
      await updateTodo(todoId, {
        title: editedTitle,
        due_date: editedDueDate || null, // Make due_date optional
        status: editedStatus,
        date: null, // Make date optional
      });
      setEditingTodoId(null);
      fetchTodos();
    } catch (error) {
      console.error('Failed to update todo', error);
    }
  };

  const handleDeleteClick = async (todoId: number) => {
    try {
      await deleteTodo(todoId);
      fetchTodos();
    } catch (error) {
      console.error('Failed to delete todo', error);
    }
  };

  const handleToggleCompleted = async (todoId: number, completed: boolean) => {
    try {
      await updateTodo(todoId, { completed: !completed });
      fetchTodos();
    } catch (error) {
      console.error('Failed to toggle todo completion', error);
    }
  };

  const handleMarkAsImportant = async (todoId: number) => {
    try {
      await markTodoAsImportant(todoId);
      fetchTodos(); // Refresh the list after marking as important
    } catch (error) {
      console.error('Failed to mark todo as important:', error);
    }
  };

  // Define the formatDate function
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
      <Sidebar />
      <div className="bg-white p-6 rounded shadow-md flex-1">
        <h2 className="text-2xl text-black mb-4">Todo List</h2>
        <div className="flex gap-2 mb-4">
          {!isInputEnabled ? (
            <button
              onClick={handleEnableInput}
              className="text-blue-600 flex gap-1">
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
                className="border border-gray-300 p-2 rounded flex-1"
              />
              <input
                type="datetime-local"
                value={newTodoDueDate}
                onChange={(e) => setNewTodoDueDate(e.target.value)}
                className="border border-gray-300 p-2 rounded"
              />
              <select
                value={newTodoStatus}
                onChange={(e) => setNewTodoStatus(e.target.value)}
                className="border border-gray-300 p-2 rounded"
              >
                <option value="not_started">Not Started</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <button
                onClick={handleAddTodo}
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

        <div className="space-y-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="p-4 border border-gray-200 rounded-lg shadow-sm bg-yellow-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleCompleted(todo.id, todo.completed)}
                    className="mr-2"
                  />

                  {editingTodoId === todo.id ? (
                    <>
                      <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="border border-gray-300 p-2 rounded flex-1"
                      />
                      <input
                        type="datetime-local"
                        value={editedDueDate}
                        onChange={(e) => setEditedDueDate(e.target.value)}
                        className="border border-gray-300 p-2 rounded"
                      />
                      <select
                        value={editedStatus}
                        onChange={(e) => setEditedStatus(e.target.value)}
                        className="border border-gray-300 p-2 rounded"
                      >
                        <option value="not_started">Not Started</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
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
                    <span
                      className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}
                      onClick={() => handleEditClick(todo)}
                    >
                      {todo.title}
                      {todo.mark_as_important && (
                        <Star size={16} className="inline ml-2 text-yellow-500" />
                      )}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleMarkAsImportant(todo.id)}
                    className={`text-yellow-600 ${todo.mark_as_important ? 'font-bold' : ''}`}
                  >
                    {todo.mark_as_important ? 'Important ★' : 'Mark as Important'}
                  </button>
                  {!editingTodoId && (
                    <button
                      onClick={() => handleEditClick(todo)}
                      className="text-blue-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteClick(todo.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="mt-2 text-sm text-gray-500">
                <div>Due: {todo.due_date ? formatDate(todo.due_date) : 'No due date'}</div>
                <div>Status: {todo.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
