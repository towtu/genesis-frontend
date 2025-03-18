import Swal from 'sweetalert2';
import { deleteTodo as deleteTodoApi } from '../services/api';
import { useGenericMutation } from './useGenericMutation';

const useDelete = () => {
  const { mutate: deleteTodo } = useGenericMutation({
    mutationFn: (todoId: number) => deleteTodoApi(todoId),
    successMessage: 'Todo deleted successfully!',
    errorMessage: 'Failed to delete todo.',
  });

  const handleDeleteClick = async (todoId: number, fetchTodos: () => void) => {
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
      deleteTodo(todoId, {
        onSuccess: () => {
          fetchTodos(); // Refresh the todo list
        },
      });
    }
  };

  return { handleDeleteClick };
};

export default useDelete;