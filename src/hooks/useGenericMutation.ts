import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface MutationOptions<TData, TVariables> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: any, variables: TVariables) => void;
  successMessage?: string;
  errorMessage?: string;
  redirectPath?: string; // Add this line
}

export const useGenericMutation = <TData, TVariables>({
  mutationFn,
  onSuccess,
  onError,
  successMessage,
  errorMessage,
  redirectPath, // Add this line
}: MutationOptions<TData, TVariables>): UseMutationResult<TData, Error, TVariables> => {
  const navigate = useNavigate(); // Add this line

  return useMutation<TData, Error, TVariables>({
    mutationFn,
    onSuccess: (data, variables) => {
      if (successMessage) {
        toast.success(successMessage); // Show success toast
      }
      if (redirectPath) {
        navigate(redirectPath); // Redirect to the specified path
      }
      if (onSuccess) {
        onSuccess(data, variables);
      }
    },
    onError: (error, variables) => {
      toast.error(errorMessage || error.message || 'An unexpected error occurred.'); // Show error toast
      if (onError) {
        onError(error, variables);
      }
    },
  });
};