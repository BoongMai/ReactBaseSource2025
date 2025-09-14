import { envConfigs } from '@/config/env';
import useAuthStore from '@/features/auth/store/authStore';
import { getMenuItems } from '@/shared/constants/menuItems';
import { useResponsive } from '@/shared/hooks/useResponsive';
import { Layout, Menu } from 'antd';
import React from 'react';
import { useLocation } from 'react-router-dom';

const { Sider } = Layout;

import type { UiStore } from '@/shared/store/uiStore';
import { useUiStore } from '@/shared/store/uiStore';

const Sidebar: React.FC = () => {
  const collapsed = useUiStore((s: UiStore) => s.collapsed);
  const setCollapsed = useUiStore((s: UiStore) => s.setCollapsed);
  const location = useLocation();
  const { isMobile, isTablet } = useResponsive();
  const user = useAuthStore(s => s.user);

  const menuItems = getMenuItems(undefined, user?.role);

  // Show sidebar on mobile (collapsed)
  if (isMobile) {
    return null;
  }

  return (
    <Sider
      collapsible={!isTablet}
      collapsed={isTablet ? true : collapsed}
      onCollapse={val => setCollapsed(val)}
      style={{
        backgroundColor: 'var(--color-sidebar-bg)',
        borderRight: '1px solid var(--color-sidebar-border)',
        minWidth: isTablet ? 80 : 200,
        maxWidth: isTablet ? 80 : 200,
      }}
    >
      <div
        style={{
          color: 'var(--color-sidebar-text)',
          height: 32,
          margin: isTablet ? 8 : 16,
          fontWeight: 'bold',
          fontSize: isTablet ? '12px' : '14px',
          textAlign: isTablet ? 'center' : 'left',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {isTablet
          ? envConfigs.APP_SHORT_NAME.substring(0, 2)
          : envConfigs.APP_NAME}
      </div>
      <Menu
        theme='dark'
        mode='inline'
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{
          backgroundColor: 'var(--color-sidebar-bg)',
          color: 'var(--color-sidebar-text)',
        }}
        inlineCollapsed={isTablet}
      />
    </Sider>
  );
};

export default Sidebar;
