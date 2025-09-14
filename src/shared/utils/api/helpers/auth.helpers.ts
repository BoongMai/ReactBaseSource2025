import { LoginRequest, RegisterRequest, User } from '@/shared/utils/api/types/auth.types';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (!/(?=.*[@$!%*?&])/.test(password)) {
    errors.push('Password must contain at least one special character (@$!%*?&)');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateLoginRequest = (
  request: LoginRequest,
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!request.email || !validateEmail(request.email)) {
    errors.push('Please enter a valid email address');
  }

  if (!request.password || request.password.length < 1) {
    errors.push('Password is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateRegisterRequest = (
  request: RegisterRequest,
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!request.email || !validateEmail(request.email)) {
    errors.push('Please enter a valid email address');
  }

  if (!request.name || request.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  const passwordValidation = validatePassword(request.password);
  if (!passwordValidation.isValid) {
    errors.push(...passwordValidation.errors);
  }

  if (request.password !== request.confirmPassword) {
    errors.push('Passwords do not match');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch {
    return true;
  }
};

export const getTokenExpirationTime = (token: string): number | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000; // Convert to milliseconds
  } catch {
    return null;
  }
};

export const getTokenTimeRemaining = (token: string): number => {
  const expirationTime = getTokenExpirationTime(token);
  if (!expirationTime) return 0;

  const remaining = expirationTime - Date.now();
  return Math.max(0, remaining);
};

export const formatUserName = (user: User): string => {
  return user.name || user.email.split('@')[0];
};

export const getUserInitials = (user: User): string => {
  const name = formatUserName(user);
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);
};

export const isUserActive = (user: User): boolean => {
  return user.isActive && user.lastLoginAt !== null;
};

export const storeAuthTokens = (tokens: { accessToken: string; refreshToken: string }): void => {
  localStorage.setItem('auth_token', tokens.accessToken);
  localStorage.setItem('refresh_token', tokens.refreshToken);
};

export const getStoredTokens = (): { accessToken: string | null; refreshToken: string | null } => {
  return {
    accessToken: localStorage.getItem('auth_token'),
    refreshToken: localStorage.getItem('refresh_token'),
  };
};

export const clearStoredTokens = (): void => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('refresh_token');
};

export const isDemoCredentials = (email: string, password: string): boolean => {
  return email === 'duy' && password === '123';
};

export const getDemoUser = (): User => ({
  id: 'demo-user-1',
  email: 'duydaik007',
  name: 'Thanh Duy',
  avatar: undefined,
  role: 'admin',
  isActive: true,
  lastLoginAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
