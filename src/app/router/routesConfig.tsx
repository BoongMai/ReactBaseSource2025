import { ROUTES } from '@/shared/constants/routes';
import { lazy } from 'react';

const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/features/auth/pages/Login'));
const Register = lazy(() =>
  import('@/features/auth/pages').then(module => ({ default: module.Register }))
);
const Dashboard = lazy(() => import('@/features/dashboard/pages/Dashboard'));
const Profile = lazy(() => import('@/features/profile/pages/Profile'));
const Settings = lazy(() => import('@/features/settings/pages/Settings'));
const NewFeat = lazy(() => import('@/features/new_feat/pages/NewFeatPage'));
const NotFound = lazy(() => import('@/shared/components/ui/NotFound'));

export type RouteItem = {
  path: string;
  element: JSX.Element;
  isPrivate?: boolean;
  children?: RouteItem[];
  id?: string;
};

export const routes: RouteItem[] = [
  { path: ROUTES.LOGIN, element: <Login /> },
  { path: ROUTES.REGISTER, element: <Register /> },
  { path: ROUTES.HOME, element: <Home />, isPrivate: true },
  { path: ROUTES.DASHBOARD, element: <Dashboard />, isPrivate: true },
  { path: ROUTES.PROFILE, element: <Profile />, isPrivate: true },
  { path: ROUTES.SETTINGS, element: <Settings />, isPrivate: true },
  { path: ROUTES.NEW_FEAT, element: <NewFeat />, isPrivate: true },
  { path: '*', element: <NotFound /> },
];
