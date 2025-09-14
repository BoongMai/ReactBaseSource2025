const prodHostname = !import.meta.env.DEV ? window.location.hostname : '';
const cookieDomain = import.meta.env.VITE_COOKIE_DOMAIN?.split(',').find((url: string) =>
  url.includes(prodHostname),
);

export const envConfigs = {
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Base Source',
  APP_SHORT_NAME: import.meta.env.VITE_APP_SHORT_NAME || 'RentPay',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  APP_DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION || 'Rent Payment Management App',
  WEB_APP_URL: import.meta.env.VITE_ENV_WEB_APP_URL,
  WEB_URLS: import.meta.env.VITE_WEB_URLS?.split(',').filter((url: string) =>
    url.includes(prodHostname),
  ),
  API_URL: import.meta.env.VITE_API_URL?.split(',').find((url: string) =>
    url.includes(prodHostname),
  ),
};
