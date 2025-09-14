import { AuthApi } from '@/pages';

// Main API exports
export * from '@/shared/utils/api/core';
export * from '@/shared/utils/api/core/types';
export * from '@/shared/utils/api/helpers';
export * from '@/shared/utils/api/modules';

// Create API instances

// Export API instances
export const authApi = new AuthApi();

// Export all APIs as a single object for convenience
export const api = {
  auth: authApi,
};
