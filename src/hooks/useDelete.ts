import Swal from 'sweetalert2';
import { deleteTodo as deleteTodoApi } from '../services/api';

const useDelete = () => {
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
      try {
        await deleteTodoApi(todoId);
        fetchTodos(); // Refresh the todo list
        Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
      } catch (error) {
        console.error('Failed to delete todo', error);
        Swal.fire('Error', 'Failed to delete the task.', 'error');
      }
    }
  };

  return { handleDeleteClick };
};

export default useDelete;