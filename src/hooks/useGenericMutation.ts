import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface MutationOptions<TData, TVariables> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: any, variables: TVariables) => void;
  successMessage?: string;
  redirectPath?: string;
}

export const useGenericMutation = <TData, TVariables>({
  mutationFn,
  onSuccess,
  onError,
  successMessage,
  redirectPath,
}: MutationOptions<TData, TVariables>): UseMutationResult<TData, Error, TVariables> => {
  const navigate = useNavigate();

  return useMutation<TData, Error, TVariables>({
    mutationFn,
    onSuccess: (data, variables) => {
      if (successMessage) {
        toast.success(successMessage); // Show success toast
      }
      if (redirectPath) {
        navigate(redirectPath);
      }
      if (onSuccess) {
        onSuccess(data, variables);
      }
    },
    onError: (error, variables) => {
      toast.error(error.message || 'An unexpected error occurred.'); // Show error toast
      if (onError) {
        onError(error, variables);
      }
    },
  });
};