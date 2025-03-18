import { useGenericMutation } from './useGenericMutation';
import { register } from '../services/api';

export const useRegister = () => {
  return useGenericMutation({
    mutationFn: (userData: {
      email: string;
      username: string;
      password: string;
      first_name: string;
      last_name: string;
    }) => register(userData),
    successMessage: 'Registration successful! Redirecting to login...',
    redirectPath: '/login',
  });
};