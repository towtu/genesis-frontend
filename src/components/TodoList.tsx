import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getTodos, createTodo, updateTodo, deleteTodo, markTodoAsImportant } from '../services/api';
import { Plus, Star, Edit, Trash } from 'lucide-react';
import Swal from 'sweetalert2';
import { useTheme } from './ThemeContext';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  due_date: string | null;
  status: string;
  mark_as_important?: boolean;
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
  const { theme } = useTheme();

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
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this task!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });

    if (result.isConfirmed) {
      try {
        await deleteTodo(todoId);
        fetchTodos();
        Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
      } catch (error) {
        console.error('Failed to delete todo', error);
        Swal.fire('Error', 'Failed to delete the task.', 'error');
      }
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

  const formatStatus = (status: string) => {
    return status
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

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
                    <span>{formatStatus(todo.status)}</span>
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
                      <button
                        onClick={() => handleEditClick(todo)}
                        className={`${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleMarkAsImportant(todo.id)}
                        className={`${todo.mark_as_important ? 'text-yellow-500' : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} hover:text-yellow-600`}
                      >
                        <Star size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(todo.id)}
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