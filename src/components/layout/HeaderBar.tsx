import { envConfigs } from '@/config/env';
import useAuthStore from '@/features/auth/store/authStore';
import { LanguageSwitcher } from '@/shared/components/ui';
import { getMenuItems } from '@/shared/constants/menuItems';
import { useResponsive } from '@/shared/hooks/useResponsive';
import { useThemeStore } from '@/shared/store/themeStore';
import { MenuOutlined } from '@ant-design/icons';
import { Button, Drawer, Layout, Menu, Select, Space, Typography } from 'antd';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

const { Header } = Layout;

const HeaderBar: React.FC = memo(() => {
  const logout = useAuthStore(s => s.logout);
  const { mode, setTheme } = useThemeStore();
  const { isMobile } = useResponsive();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuClose = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const handleMobileMenuOpen = useCallback(() => {
    setMobileMenuOpen(true);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handleThemeChange = useCallback(
    (value: string) => {
      setTheme(value as any);
    },
    [setTheme]
  );

  const user = useAuthStore(s => s.user);

  const menuItems = useMemo(
    () => getMenuItems(handleMobileMenuClose, user?.role),
    [handleMobileMenuClose, user?.role]
  );

  const themeOptions = useMemo(
    () => [
      { label: 'System', value: 'system' },
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
    ],
    []
  );

  const headerContent = useMemo(
    () => (
      <Space size='small' wrap>
        {/* <NetworkStatusIndicator showText={false} size='small' /> */}
        <LanguageSwitcher />
        <Select
          value={mode}
          onChange={handleThemeChange}
          options={themeOptions}
          style={{ width: isMobile ? 100 : 140 }}
          size={isMobile ? 'small' : 'middle'}
        />
        <Button
          onClick={handleLogout}
          size={isMobile ? 'small' : 'middle'}
          type='primary'
          danger
        >
          Logout
        </Button>
      </Space>
    ),
    [mode, handleThemeChange, themeOptions, isMobile, handleLogout]
  );

  return (
    <>
      <Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--color-header-bg)',
          color: 'var(--color-header-text)',
          borderBottom: '1px solid var(--color-header-border)',
          padding: isMobile ? '0 8px' : '0 24px',
          height: isMobile ? 48 : 64,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {isMobile && (
            <Button
              type='text'
              icon={<MenuOutlined />}
              onClick={handleMobileMenuOpen}
              style={{ color: 'var(--color-header-text)' }}
            />
          )}
          <div
            style={{
              color: 'var(--color-header-text)',
              fontWeight: 'bold',
              fontSize: isMobile ? '14px' : '16px',
            }}
          >
            {isMobile ? envConfigs.APP_SHORT_NAME : envConfigs.APP_NAME}
          </div>
        </div>

        {!isMobile ? (
          headerContent
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* <NetworkStatusIndicator showText={false} size="small" /> */}
            <Button onClick={handleLogout} size='small' type='primary' danger>
              Logout
            </Button>
          </div>
        )}
      </Header>

      {/* Mobile Menu Drawer */}
      <Drawer
        title='Menu'
        placement='left'
        onClose={handleMobileMenuClose}
        open={mobileMenuOpen}
        width={280}
        styles={{
          body: {
            backgroundColor: 'var(--color-sidebar-bg)',
            color: 'var(--color-sidebar-text)',
            padding: 0,
          },
          header: {
            backgroundColor: 'var(--color-sidebar-bg)',
            color: 'var(--color-sidebar-text)',
            borderBottom: '1px solid var(--color-sidebar-border)',
          },
        }}
      >
        <div style={{ padding: '16px 0' }}>
          <div
            style={{
              color: 'var(--color-sidebar-text)',
              height: 32,
              margin: '0 16px 16px 16px',
              fontWeight: 'bold',
              fontSize: '16px',
            }}
          >
            {envConfigs.APP_NAME}
          </div>

          <Menu
            theme='dark'
            mode='inline'
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{
              backgroundColor: 'var(--color-sidebar-bg)',
              color: 'var(--color-sidebar-text)',
              border: 'none',
            }}
          />
        </div>

        {/* Settings Section */}
        <div
          style={{
            borderTop: '1px solid var(--color-sidebar-border)',
            padding: '16px',
            marginTop: 'auto',
          }}
        >
          <Space direction='vertical' size='middle' style={{ width: '100%' }}>
            <div>
              <Typography.Text
                strong
                style={{ color: 'var(--color-sidebar-text)', fontSize: '14px' }}
              >
                Theme
              </Typography.Text>
              <Select
                value={mode}
                onChange={handleThemeChange}
                options={themeOptions}
                style={{ width: '100%', marginTop: 8 }}
                size='small'
              />
            </div>

            <div>
              <Typography.Text
                strong
                style={{ color: 'var(--color-sidebar-text)', fontSize: '14px' }}
              >
                Language
              </Typography.Text>
              <div style={{ marginTop: 8 }}>
                <LanguageSwitcher />
              </div>
            </div>
          </Space>
        </div>
      </Drawer>
    </>
  );
});

HeaderBar.displayName = 'HeaderBar';

export default HeaderBar;
