import HeaderBar from '@/components/layout/HeaderBar';
import PageWrapper from '@/components/layout/PageWrapper';
import Sidebar from '@/components/layout/Sidebar';
import { envConfigs } from '@/config/env';
import NetworkToast from '@/shared/components/NetworkToast';
import { useResponsive } from '@/shared/hooks/useResponsive';
import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';

const { Content, Footer } = Layout;

const AppLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { isMobile, isTablet } = useResponsive();

  return (
    <Layout style={{ minHeight: '100vh', margin: 0, padding: 0 }}>
      <NetworkToast />
      <Sidebar />
      <Layout style={{ margin: 0, padding: 0 }}>
        <HeaderBar />
        <Content
          style={{
            margin: 0,
            padding: isMobile ? '8px' : '16px',
            backgroundColor: 'var(--color-content-bg)',
            color: 'var(--color-content-text)',
            minHeight: isMobile ? 'calc(100vh - 48px)' : 'calc(100vh - 64px)',
          }}
        >
          <PageWrapper>{children ?? <Outlet />}</PageWrapper>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            fontSize: isMobile ? '12px' : '14px',
            padding: isMobile ? '8px 16px' : '16px 24px',
            margin: 0,
          }}
        >
          {envConfigs.APP_NAME} ©2025
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
