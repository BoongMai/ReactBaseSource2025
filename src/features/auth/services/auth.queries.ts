import useAuthStore from '@/features/auth/store/authStore';
import { authApi } from '@/shared/utils/api/modules/auth.api';
import { LoginRequest, RegisterRequest } from '@/shared/utils/api/types/auth.types';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      console.log('Login successful:', response);
      // Store auth data
      login(response.data.token, response.data.user);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (data) => {
      console.log('Register successful:', data);
    },
    onError: (error) => {
      console.error('Register failed:', error);
    },
  });
};
