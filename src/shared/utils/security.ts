// Security utilities for enterprise-level protection
export { secureTokenManager } from '@/shared/utils/security/tokenManager';

// XSS Protection
export const sanitizeHtml = (html: string): string => {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

// CSRF Token management
export const getCsrfToken = (): string | null => {
  const token = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute('content');
  return token || null;
};

// Input validation
export const validateInput = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  password: (password: string): { isValid: boolean; errors: string[] } => {
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
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  phone: (phone: string): boolean => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },

  url: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
};

// Rate limiting
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number = 100, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  isAllowed(key: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];

    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < this.windowMs);

    if (validRequests.length >= this.maxRequests) {
      return false;
    }

    // Add current request
    validRequests.push(now);
    this.requests.set(key, validRequests);

    return true;
  }

  getRemainingRequests(key: string): number {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    const validRequests = requests.filter(time => now - time < this.windowMs);

    return Math.max(0, this.maxRequests - validRequests.length);
  }
}

export const cspHelpers = {
  generateNonce: (): string => {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join(
      ''
    );
  },

  validateCspHeader: (header: string): boolean => {
    const requiredDirectives = [
      'default-src',
      'script-src',
      'style-src',
      'img-src',
    ];
    return requiredDirectives.every(directive => header.includes(directive));
  },
};

// Data encryption utilities
export const encryption = {
  // Simple base64 encoding (not for sensitive data)
  encode: (data: string): string => {
    return btoa(encodeURIComponent(data));
  },

  decode: (encodedData: string): string => {
    return decodeURIComponent(atob(encodedData));
  },

  // Generate secure random string
  generateSecureToken: (length: number = 32): string => {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join(
      ''
    );
  },
};

// Session management
export const sessionManager = {
  setSecureCookie: (name: string, value: string, days: number = 7): void => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;
  },

  getCookie: (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  },

  clearCookie: (name: string): void => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  },
};
