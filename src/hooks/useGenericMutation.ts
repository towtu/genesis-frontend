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
    onError: (error: any, variables) => {
      let message = errorMessage || 'An unexpected error occurred.';
      if (error?.response?.data) {
        const data = error.response.data;
        if (typeof data === 'string') {
          message = data;
        } else if (data.detail) {
          message = data.detail;
        } else {
          const messages = Object.entries(data)
            .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(' ') : val}`)
            .join('\n');
          if (messages) message = messages;
        }
      }
      toast.error(message);
      if (onError) {
        onError(error, variables);
      }
    },
  });
};