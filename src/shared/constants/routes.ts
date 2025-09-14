export enum ROUTES {
  HOME = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  PROFILE = '/profile',
  DASHBOARD = '/dashboard',
  SETTINGS = '/settings',
  NEW_FEAT = '/new-feat',
}

export const OFFLINE_RESTRICTED_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTER];

export const OFFLINE_FRIENDLY_ROUTES = [
  '',
  ROUTES.HOME,
  ROUTES.DASHBOARD,
  ROUTES.PROFILE,
  ROUTES.SETTINGS,
  ROUTES.NEW_FEAT,
];
