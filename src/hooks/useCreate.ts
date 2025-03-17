import { useState } from 'react';
import { createTodo as createTodoApi } from '../services/api';


const useCreate = () => {
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [newTodoDueDate, setNewTodoDueDate] = useState<string>('');
  const [newTodoStatus, setNewTodoStatus] = useState<string>('not_started');
  const [isInputEnabled, setIsInputEnabled] = useState<boolean>(false);

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

    try {
      await createTodoApi({
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
      fetchTodos(); // Refresh the todo list
    } catch (error) {
      console.error('Failed to add todo', error);
    }
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
  };
};

export default useCreate;