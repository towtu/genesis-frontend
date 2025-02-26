import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getTodos, createTodo, updateTodo, deleteTodo, markTodoAsImportant } from '../services/api';
import Sidebar from './Sidebar';
import { Plus, Star, Edit, Trash } from 'lucide-react'; // Import icons

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  due_date: string | null;
  status: string;
  mark_as_important?: boolean; // Optional property
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [newTodoDueDate, setNewTodoDueDate] = useState<string>('');
  const [newTodoStatus, setNewTodoStatus] = useState<string>('not_started');
  const [isInputEnabled, setIsInputEnabled] = useState<boolean>(false);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [editedDueDate, setEditedDueDate] = useState<string>('');
  const [editedStatus, setEditedStatus] = useState<string>('not_started');
  const location = useLocation();

  const searchQuery = new URLSearchParams(location.search).get('search') || '';

  useEffect(() => {
    fetchTodos();
  }, [searchQuery]);

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      const filteredTodos = response.data.filter((todo: Todo) =>
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
        due_date: newTodoDueDate || null,
        status: newTodoStatus,
        date: null,
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

  const handleEditClick = (todo: Todo) => {
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
        due_date: editedDueDate || null,
        status: editedStatus,
        date: null,
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
      await updateTodo(todoId, { completed: !completed, status: !completed ? 'completed' : 'not_started' });
      fetchTodos();
    } catch (error) {
      console.error('Failed to toggle todo completion', error);
    }
  };

  const handleMarkAsImportant = async (todoId: number) => {
    try {
      await markTodoAsImportant(todoId);
      fetchTodos();
    } catch (error) {
      console.error('Failed to mark todo as important:', error);
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
      <Sidebar />
      <div className="bg-white p-6 rounded shadow-md flex-1">
        <h2 className="text-2xl text-black mb-4">Todo List</h2>
        <div className="flex gap-2 mb-4">
          {!isInputEnabled ? (
            <button
              onClick={handleEnableInput}
              className="border border-blue-600 text-blue-600 flex gap-1 px-4 py-2 rounded">
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

        {/* Table Structure */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Task Name</th>
              <th className="p-2 text-left">Due Date</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-2 flex items-center">
                  {editingTodoId === todo.id ? (
                    <>
                      <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="border border-gray-300 p-2 rounded w-full"
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
                      className="border border-gray-300 p-2 rounded w-full"
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
                      className="border border-gray-300 p-2 rounded w-full"
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
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={20} />
                      </button>
                      {/* Star Button */}
                      <button
                        onClick={() => handleMarkAsImportant(todo.id)}
                        className={`${todo.mark_as_important ? 'text-yellow-500' : 'text-gray-500'} hover:text-yellow-600`}
                      >
                        <Star size={20} />
                      </button>
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteClick(todo.id)}
                        className="text-red-600 hover:text-red-800"
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
