import { BaseApi } from '@/shared/utils/api/core';
import {
  ChangePasswordRequest,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  UpdateProfileRequest,
  User,
} from '@/shared/utils/api/types/auth.types';

export class AuthApi extends BaseApi {
  constructor() {
    super('/account-svc/v1');
  }

  // Authentication
  async login(credentials: LoginRequest) {
    return this.post<LoginResponse>('/users/login', credentials);
  }

  async register(userData: RegisterRequest) {
    return this.post<RegisterResponse>('/users/register', userData);
  }

  async logout() {
    return this.post('/users/logout');
  }

  async refreshToken(request: RefreshTokenRequest) {
    return this.post<RefreshTokenResponse>('/users/refresh-token', request);
  }

  // Password Management
  async forgotPassword(request: ForgotPasswordRequest) {
    return this.post('/users/forgot-password', request);
  }

  async resetPassword(request: ResetPasswordRequest) {
    return this.post('/users/reset-password', request);
  }

  async changePassword(request: ChangePasswordRequest) {
    return this.post('/users/change-password', request);
  }

  // Profile Management
  async getProfile() {
    return this.get<User>('/users/profile');
  }

  async updateProfile(request: UpdateProfileRequest) {
    return this.put<User>('/users/profile', request);
  }

  async deleteAccount() {
    return this.delete('/users/account');
  }

  // Verification
  async verifyEmail(token: string) {
    return this.post(`/users/verify-email/${token}`);
  }

  async resendVerificationEmail() {
    return this.post('/users/resend-verification');
  }
}

// Export instance
export const authApi = new AuthApi();
