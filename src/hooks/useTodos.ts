import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getTodos as fetchTodosApi,
  updateTodo as updateTodoApi,
  markTodoAsImportant as markTodoAsImportantApi,
} from '../services/api';
import { useGenericMutation } from './useGenericMutation';
import { Todo } from '../services/types'; // Import the shared Todo type

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
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
      const todos = await fetchTodosApi(); // Directly get the array of todos
      const filteredTodos = todos.filter((todo: Todo) =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setTodos(filteredTodos);
    } catch (error) {
      console.error('Failed to fetch todos', error);
    }
  };

  const { mutate: updateTodo } = useGenericMutation({
    mutationFn: (data: { todoId: number; updatedData: Partial<Todo> }) =>
      updateTodoApi(data.todoId, data.updatedData),
    successMessage: 'Todo updated successfully!',
    errorMessage: 'Failed to update todo.',
  });

  const { mutate: markAsImportant } = useGenericMutation({
    mutationFn: (todoId: number) => markTodoAsImportantApi(todoId),
    successMessage: 'Todo marked as important!',
    errorMessage: 'Failed to mark todo as important.',
  });

  const handleEditClick = (todo: Todo) => {
    setEditingTodoId(todo.id);
    setEditedTitle(todo.title);
    setEditedDueDate(todo.due_date ? formatDateForInput(todo.due_date) : '');
    setEditedStatus(todo.status || 'not_started');
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditedTitle('');
    setEditedDueDate('');
    setEditedStatus('not_started');
  };

  const handleSaveClick = async (todoId: number) => {
    updateTodo(
      {
        todoId,
        updatedData: {
          title: editedTitle,
          due_date: editedDueDate || null,
          status: editedStatus,
        },
      },
      {
        onSuccess: () => {
          setEditingTodoId(null);
          fetchTodos();
        },
      }
    );
  };

  const handleToggleCompleted = async (todoId: number, completed: boolean) => {
    const todoToUpdate = todos.find((todo) => todo.id === todoId);
    if (todoToUpdate) {
      updateTodo(
        {
          todoId,
          updatedData: {
            completed: !completed,
            status: !completed ? 'completed' : 'not_started',
            due_date: todoToUpdate.due_date || null,
          },
        },
        {
          onSuccess: () => {
            fetchTodos();
          },
        }
      );
    }
  };

  const handleMarkAsImportant = async (todoId: number) => {
    markAsImportant(todoId, {
      onSuccess: () => {
        fetchTodos();
      },
    });
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

  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return {
    todos,
    editingTodoId,
    setEditingTodoId,
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
  };
};

export default useTodos;