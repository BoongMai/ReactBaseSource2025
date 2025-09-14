// Secure token management for payment systems

import { encryption } from "@/shared/utils/security";

interface TokenData {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  tokenType: string;
}

class SecureTokenManager {
  private readonly TOKEN_KEY = 'secure_auth_data';
  private readonly REFRESH_KEY = 'secure_refresh_data';
  private readonly ENCRYPTION_KEY = 'payment_secure_key';

  // Store tokens securely with encryption
  setTokens(tokenData: TokenData): void {
    try {
      const encryptedData = encryption.encode(JSON.stringify(tokenData));
      
      // Use httpOnly cookies for sensitive data (handled by backend)
      // For now, use sessionStorage with encryption
      sessionStorage.setItem(this.TOKEN_KEY, encryptedData);
      
      // Set secure refresh token
      sessionStorage.setItem(this.REFRESH_KEY, encryption.encode(tokenData.refreshToken));
    } catch (error) {
      console.error('Failed to store tokens securely:', error);
      throw new Error('Token storage failed');
    }
  }

  // Get access token
  getAccessToken(): string | null {
    try {
      const encryptedData = sessionStorage.getItem(this.TOKEN_KEY);
      if (!encryptedData) return null;

      const decryptedData = encryption.decode(encryptedData);
      const tokenData: TokenData = JSON.parse(decryptedData);
      
      // Check if token is expired
      if (Date.now() >= tokenData.expiresAt) {
        this.clearTokens();
        return null;
      }

      return tokenData.accessToken;
    } catch (error) {
      console.error('Failed to retrieve access token:', error);
      this.clearTokens();
      return null;
    }
  }

  // Get refresh token
  getRefreshToken(): string | null {
    try {
      const encryptedRefresh = sessionStorage.getItem(this.REFRESH_KEY);
      if (!encryptedRefresh) return null;

      return encryption.decode(encryptedRefresh);
    } catch (error) {
      console.error('Failed to retrieve refresh token:', error);
      return null;
    }
  }

  // Check if token is valid
  isTokenValid(): boolean {
    const token = this.getAccessToken();
    return token !== null;
  }

  // Clear all tokens
  clearTokens(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.REFRESH_KEY);
  }

  // Get token info without exposing the token
  getTokenInfo(): { isValid: boolean; expiresAt: number | null } {
    try {
      const encryptedData = sessionStorage.getItem(this.TOKEN_KEY);
      if (!encryptedData) return { isValid: false, expiresAt: null };

      const decryptedData = encryption.decode(encryptedData);
      const tokenData: TokenData = JSON.parse(decryptedData);
      
      return {
        isValid: Date.now() < tokenData.expiresAt,
        expiresAt: tokenData.expiresAt
      };
    } catch {
      return { isValid: false, expiresAt: null };
    }
  }
}

export const secureTokenManager = new SecureTokenManager();
