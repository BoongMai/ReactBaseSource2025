import AppRoutes from '@/app/router/routes';
import { envConfigs } from '@/config/env';
import queryClient from '@/lib/api/queryClient';
import '@/lib/i18n';
import { ErrorBoundary, PageLoading } from '@/shared/components/ui';
import { useThemeStore } from '@/shared/store/themeStore';
import '@/styles/global.module.scss';
import '@/styles/theme.scss';
import { QueryClientProvider } from '@tanstack/react-query';
import { App, ConfigProvider, theme as antdTheme } from 'antd';
import React, { Suspense, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { Workbox } from 'workbox-window';

const Root: React.FC = () => {
  const { theme, mode } = useThemeStore();
  const prefersDark =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  const resolvedMode =
    mode === 'system' ? (prefersDark ? 'dark' : 'light') : mode;
  const mergedTheme = {
    ...theme,
    algorithm:
      resolvedMode === 'dark'
        ? antdTheme.darkAlgorithm
        : antdTheme.defaultAlgorithm,
  } as const;

  useEffect(() => {
    const root = document.documentElement;
    const tokens: any = (theme as any).token || {};
    if (tokens.colorBgBase)
      root.style.setProperty('--color-bg', tokens.colorBgBase);
    if (tokens.colorTextBase)
      root.style.setProperty('--color-text', tokens.colorTextBase);
    if (tokens.colorPrimary)
      root.style.setProperty('--color-primary', tokens.colorPrimary);
    root.setAttribute('data-theme', resolvedMode);
  }, [theme, resolvedMode]);

  useEffect(() => {
    document.title = envConfigs.APP_NAME;
  }, []);

  return (
    <ErrorBoundary>
      <ConfigProvider theme={mergedTheme}>
        <App>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter
              future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
            >
              <Suspense fallback={<PageLoading />}>
                <AppRoutes />
              </Suspense>
              <Toaster />
            </BrowserRouter>
          </QueryClientProvider>
        </App>
      </ConfigProvider>
    </ErrorBoundary>
  );
};

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

// PWA Service Worker Registration
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', async () => {
    try {
      const workbox = new Workbox('/sw.js');

      workbox.addEventListener('waiting', () => {
        workbox.messageSW({ type: 'SKIP_WAITING' });
      });

      workbox.addEventListener('controlling', () => {
        window.location.reload();
      });

      await workbox.register();
      console.log('Service Worker registered successfully');
    } catch (error) {
      console.warn('Service Worker registration failed:', error);
    }
  });
}
