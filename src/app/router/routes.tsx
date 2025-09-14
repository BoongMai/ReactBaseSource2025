import { RouteItem, routes } from '@/app/router/routesConfig';
import AppLayout from '@/components/layout/AppLayout';
import useAuthStore from '@/features/auth/store/authStore';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const user = useAuthStore(s => s.user);
  const token = useAuthStore(s => s.token);

  if (user && token) {
    return children;
  }

  return <Navigate to='/login' replace />;
};

const renderRoutes = (routesArr: RouteItem[]) =>
  routesArr.map(r => {
    const element = r.isPrivate ? (
      <PrivateRoute>{r.element}</PrivateRoute>
    ) : (
      r.element
    );
    const wrapped = r.isPrivate ? <AppLayout>{element}</AppLayout> : element;
    if (r.children) {
      return (
        <Route key={r.path} path={r.path} element={wrapped}>
          {renderRoutes(r.children)}
        </Route>
      );
    }
    return <Route key={r.path} path={r.path} element={wrapped} />;
  });

const AppRoutes: React.FC = () => {
  return <Routes>{renderRoutes(routes)}</Routes>;
};

export default AppRoutes;
