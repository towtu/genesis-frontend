import { useGenericMutation } from './useGenericMutation';
import { login } from '../services/api';

export const useLogin = () => {
  return useGenericMutation({
    mutationFn: (credentials: { email: string; password: string }) => login(credentials),
    onSuccess: (response) => {
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      window.location.reload();
    },
    successMessage: 'Login successful! Redirecting to dashboard...',
    redirectPath: '/dashboard',
  });
};