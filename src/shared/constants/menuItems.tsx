import {
  DashboardOutlined,
  ExperimentOutlined,
  HomeOutlined,
  LockOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from './routes';
import { UserRole } from './userRoles';

interface MenuItem {
  label: React.ReactNode;
  title: string;
  key: string;
  icon: React.ReactNode;
  roles?: UserRole[];
}

const allMenuItems: MenuItem[] = [
  {
    label: <Link to={ROUTES.HOME}>Home</Link>,
    title: 'Home',
    key: ROUTES.HOME,
    icon: <HomeOutlined />,
    roles: [UserRole.ADMIN, UserRole.USER, UserRole.DEMO],
  },
  {
    label: <Link to={ROUTES.DASHBOARD}>Dashboard</Link>,
    title: 'Dashboard',
    key: ROUTES.DASHBOARD,
    icon: <DashboardOutlined />,
    roles: [UserRole.ADMIN, UserRole.USER],
  },
  {
    label: <Link to={ROUTES.NEW_FEAT}>New Feature</Link>,
    title: 'New Feature',
    key: ROUTES.NEW_FEAT,
    icon: <ExperimentOutlined />,
    roles: [UserRole.ADMIN, UserRole.USER],
  },
  {
    label: <Link to={ROUTES.PROFILE}>Profile</Link>,
    title: 'Profile',
    key: ROUTES.PROFILE,
    icon: <UserOutlined />,
    roles: [UserRole.ADMIN, UserRole.USER, UserRole.DEMO],
  },
  {
    label: <Link to={ROUTES.SETTINGS}>Settings</Link>,
    title: 'Settings',
    key: ROUTES.SETTINGS,
    icon: <SettingOutlined />,
    roles: [UserRole.ADMIN, UserRole.USER],
  },
  {
    label: <Link to='/admin-panel'>Admin Panel</Link>,
    title: 'Admin Panel',
    key: '/admin-panel',
    icon: <LockOutlined />,
    roles: [UserRole.ADMIN],
  },
];

export const getMenuItems = (onItemClick?: () => void, userRole?: UserRole) => {
  const filteredItems = allMenuItems.filter(
    item => !item.roles || !userRole || item.roles.includes(userRole)
  );

  return filteredItems.map(item => ({
    ...item,
    label: React.cloneElement(item.label as React.ReactElement, {
      onClick: onItemClick,
    }),
  }));
};
