import { ApiError, ApiResponse, RequestConfig } from '@/shared/utils/api/core/types';
import { withTimeout } from '@/shared/utils/helpers/apiTimeout';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export abstract class BaseApi {
  protected client: AxiosInstance;
  protected baseUrl: string;
  protected defaultTimeout: number;

  constructor(baseUrl: string, timeout: number = 5000) {
    this.baseUrl = baseUrl;
    this.defaultTimeout = timeout;
    this.client = axios.create({
      baseURL: baseUrl,
      timeout: this.defaultTimeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        const apiError: ApiError = {
          message: error.response?.data?.message || error.message || 'An error occurred',
          code: error.response?.data?.code,
          status: error.response?.status,
          details: error.response?.data,
          service: this.detectServiceFromUrl(error?.config?.url || ''),
          url: error?.config?.url,
        };
        return Promise.reject(apiError);
      },
    );
  }

  protected async get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const timeout = config?.timeout || this.defaultTimeout;
    const response = await withTimeout(
      this.client.get<ApiResponse<T>>(endpoint, this.buildAxiosConfig(config)),
      timeout,
    );
    return response.data;
  }

  protected async post<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    const timeout = config?.timeout || this.defaultTimeout;
    const response = await withTimeout(
      this.client.post<ApiResponse<T>>(endpoint, data, this.buildAxiosConfig(config)),
      timeout,
    );
    return response.data;
  }

  protected async put<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    const timeout = config?.timeout || this.defaultTimeout;
    const response = await withTimeout(
      this.client.put<ApiResponse<T>>(endpoint, data, this.buildAxiosConfig(config)),
      timeout,
    );
    return response.data;
  }

  protected async delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const timeout = config?.timeout || this.defaultTimeout;
    const response = await withTimeout(
      this.client.delete<ApiResponse<T>>(endpoint, this.buildAxiosConfig(config)),
      timeout,
    );
    return response.data;
  }

  protected async patch<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    const timeout = config?.timeout || this.defaultTimeout;
    const response = await withTimeout(
      this.client.patch<ApiResponse<T>>(endpoint, data, this.buildAxiosConfig(config)),
      timeout,
    );
    return response.data;
  }

  private buildAxiosConfig(config?: RequestConfig): AxiosRequestConfig {
    return {
      headers: config?.headers,
      timeout: config?.timeout || this.defaultTimeout,
    };
  }

  private detectServiceFromUrl(url: string): string {
    if (url.includes('/account-svc/')) return 'account';
    if (url.includes('/payment-svc/')) return 'payment';
    if (url.includes('/notification-svc/')) return 'notification';
    if (url.includes('/user-svc/')) return 'user';
    return 'unknown';
  }
}
