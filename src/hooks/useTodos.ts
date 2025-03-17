import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getTodos as fetchTodosApi,
  updateTodo as updateTodoApi,
  markTodoAsImportant as markTodoAsImportantApi,
} from '../services/api';
import { useGenericMutation } from './useGenericMutation';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  due_date: string | null;
  status: string;
  mark_as_important?: boolean;
}

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
      const response = await fetchTodosApi();
      const filteredTodos = response.data.filter((todo: Todo) =>
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
            due_date: todoToUpdate.due_date,
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