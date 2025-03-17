import { useState } from 'react';
import { createTodo as createTodoApi } from '../services/api';
import { useGenericMutation } from './useGenericMutation';

const useCreate = () => {
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [newTodoDueDate, setNewTodoDueDate] = useState<string>('');
  const [newTodoStatus, setNewTodoStatus] = useState<string>('not_started');
  const [isInputEnabled, setIsInputEnabled] = useState<boolean>(false);

  const { mutate: createTodo, isPending } = useGenericMutation({
    mutationFn: (data: {
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
  };

  const handleCancelCreate = () => {
    setNewTodoTitle('');
    setNewTodoDueDate('');
    setNewTodoStatus('not_started');
    setIsInputEnabled(false);
  };

  const handleAddTodo = async (fetchTodos: () => void) => {
    if (!newTodoTitle.trim()) return;

    createTodo(
      {
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
  };
};

export default useCreate;