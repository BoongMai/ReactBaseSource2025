// Secure API client for enhanced security
import { ApiError, ApiResponse, RequestConfig } from '@/shared/utils/api/core/types';
import { withTimeout } from '@/shared/utils/helpers/apiTimeout';
import { secureTokenManager } from '@/shared/utils/security/tokenManager';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class SecureApiClient {
  protected client: AxiosInstance;
  protected baseUrl: string;
  protected defaultTimeout: number;
  protected requestId: string;

  constructor(baseUrl: string, timeout: number = 10000) {
    this.baseUrl = baseUrl;
    this.defaultTimeout = timeout;
    this.requestId = this.generateRequestId();
    
    this.client = axios.create({
      baseURL: baseUrl,
      timeout: this.defaultTimeout,
      headers: {
        'Content-Type': 'application/json',
        'X-Request-ID': this.requestId,
        'X-Client-Version': '1.0.0',
        'X-Platform': 'web',
      },
    });

    this.setupSecureInterceptors();
  }

  private setupSecureInterceptors(): void {
    // Request interceptor with security enhancements
    this.client.interceptors.request.use(
      (config) => {
        // Add authentication
        const token = secureTokenManager.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add CSRF token
        const csrfToken = this.getCsrfToken();
        if (csrfToken) {
          config.headers['X-CSRF-Token'] = csrfToken;
        }

        // Add request timestamp
        config.headers['X-Request-Time'] = Date.now().toString();

        // Add content hash for POST/PUT requests
        if (config.data && (config.method === 'post' || config.method === 'put')) {
          config.headers['X-Content-Hash'] = this.generateContentHash(config.data);
        }

        // Add security headers
        config.headers['X-Frame-Options'] = 'DENY';
        config.headers['X-Content-Type-Options'] = 'nosniff';

        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor with enhanced error handling
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        // Validate response integrity
        this.validateResponseIntegrity(response);
        return response;
      },
      (error) => {
        const apiError: ApiError = {
          message: error.response?.data?.message || error.message || 'An error occurred',
          code: error.response?.data?.code,
          status: error.response?.status,
          details: error.response?.data,
          service: this.detectServiceFromUrl(error?.config?.url || ''),
          url: error?.config?.url,
          requestId: this.requestId,
          timestamp: new Date().toISOString(),
        };

         // Handle specific errors
         if (this.isCriticalError(error)) {
           this.handleCriticalError(apiError);
         }

        return Promise.reject(apiError);
      },
    );
  }

  // Secure GET request
  protected async secureGet<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const timeout = config?.timeout || this.defaultTimeout;
    const response = await withTimeout(
      this.client.get<ApiResponse<T>>(endpoint, this.buildSecureConfig(config)),
      timeout,
    );
    return response.data;
  }

  // Secure POST request
  protected async securePost<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    const timeout = config?.timeout || this.defaultTimeout;
    const response = await withTimeout(
      this.client.post<ApiResponse<T>>(endpoint, data, this.buildSecureConfig(config)),
      timeout,
    );
    return response.data;
  }

  // Secure PUT request
  protected async securePut<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    const timeout = config?.timeout || this.defaultTimeout;
    const response = await withTimeout(
      this.client.put<ApiResponse<T>>(endpoint, data, this.buildSecureConfig(config)),
      timeout,
    );
    return response.data;
  }

  // Secure DELETE request
  protected async secureDelete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const timeout = config?.timeout || this.defaultTimeout;
    const response = await withTimeout(
      this.client.delete<ApiResponse<T>>(endpoint, this.buildSecureConfig(config)),
      timeout,
    );
    return response.data;
  }

  // Build secure configuration
  private buildSecureConfig(config?: RequestConfig): AxiosRequestConfig {
    return {
      headers: {
        ...config?.headers,
        'X-Request-ID': this.requestId,
        'X-Client-Version': '1.0.0',
      },
      timeout: config?.timeout || this.defaultTimeout,
    };
  }

  // Generate request ID
  private generateRequestId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 9);
    return `req_${timestamp}_${random}`;
  }

  // Get CSRF token
  private getCsrfToken(): string | null {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    return token || null;
  }

  // Generate content hash
  private generateContentHash(data: any): string {
    const dataString = JSON.stringify(data);
    // In production, use proper SHA-256
    return btoa(dataString);
  }

  // Validate response integrity
  private validateResponseIntegrity(response: AxiosResponse): void {
    // Check response headers for security
    const requiredHeaders = ['X-Content-Type-Options', 'X-Frame-Options'];
    
    for (const header of requiredHeaders) {
      if (!response.headers[header]) {
        console.warn(`Missing security header: ${header}`);
      }
    }
  }

  // Check if error is critical
  private isCriticalError(error: any): boolean {
    const criticalErrorCodes = ['UNAUTHORIZED', 'FORBIDDEN', 'INTERNAL_SERVER_ERROR', 'SERVICE_UNAVAILABLE'];
    return criticalErrorCodes.includes(error.response?.data?.code) || error.response?.status >= 500;
  }

  // Handle critical errors
  private handleCriticalError(apiError: ApiError): void {
    // Log critical error securely
    console.error('Critical error:', {
      message: apiError.message,
      code: apiError.code,
      status: apiError.status,
      service: apiError.service,
      requestId: apiError.requestId,
      timestamp: apiError.timestamp,
    });
    
    // In production, send to monitoring service
    // monitoringService.trackCriticalError(apiError);
  }

  // Detect service from URL
  private detectServiceFromUrl(url: string): string {
    if (url.includes('/account-svc/')) return 'account';
    if (url.includes('/notification-svc/')) return 'notification';
    if (url.includes('/user-svc/')) return 'user';
    if (url.includes('/api/')) return 'api';
    return 'unknown';
  }
}
