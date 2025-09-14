import { envConfigs } from '@/config/env';

const appConfig = {
  ...envConfigs,
  CONNECTION_TIMEOUT: 30000,
};

export default appConfig;
