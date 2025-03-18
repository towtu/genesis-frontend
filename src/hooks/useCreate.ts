import { useState } from 'react';
import { createTodo as createTodoApi } from '../services/api';
import { useGenericMutation } from './useGenericMutation';

const useCreate = () => {
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [newTodoDueDate, setNewTodoDueDate] = useState<string>('');
  const [newTodoStatus, setNewTodoStatus] = useState<string>('not_started');
  const [isInputEnabled, setIsInputEnabled] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(''); // State for error messages

  const { mutate: createTodo, isPending } = useGenericMutation({
    mutationFn: (data: {
      id: number;
      title: string;
      completed: boolean;
      due_date: string | null;
      status: string;
      date: null;
    }) => createTodoApi(data),
    successMessage: 'Todo created successfully!',
    errorMessage: 'Failed to create todo.',
  });

  const handleEnableInput = () => {
    setIsInputEnabled(true);
    setErrorMessage(''); // Clear any previous error messages
  };

  const handleCancelCreate = () => {
    setNewTodoTitle('');
    setNewTodoDueDate('');
    setNewTodoStatus('not_started');
    setIsInputEnabled(false);
    setErrorMessage(''); // Clear any error messages
  };

  const handleAddTodo = async (fetchTodos: () => void) => {
    if (!newTodoTitle.trim()) {
      setErrorMessage('Task title cannot be empty.');
      return;
    }

    // Validate due date
    const currentDateTime = new Date().toISOString().slice(0, 16); // Get current date and time in `YYYY-MM-DDTHH:mm` format
    if (newTodoDueDate && newTodoDueDate < currentDateTime) {
      setErrorMessage('Due date is invalid');
      return;
    }

    // Clear any previous error messages
    setErrorMessage('');

    createTodo(
      {
        id: 0,
        title: newTodoTitle,
        completed: false,
        due_date: newTodoDueDate || null,
        status: newTodoStatus,
        date: null,
      },
      {
        onSuccess: () => {
          setNewTodoTitle('');
          setNewTodoDueDate('');
          setNewTodoStatus('not_started');
          setIsInputEnabled(false);
          fetchTodos(); // Refresh the todo list
        },
      }
    );
  };

  return {
    newTodoTitle,
    setNewTodoTitle,
    newTodoDueDate,
    setNewTodoDueDate,
    newTodoStatus,
    setNewTodoStatus,
    isInputEnabled,
    setIsInputEnabled,
    handleEnableInput,
    handleCancelCreate,
    handleAddTodo,
    isPending,
    errorMessage, // Expose error message to the component
  };
};

export default useCreate;