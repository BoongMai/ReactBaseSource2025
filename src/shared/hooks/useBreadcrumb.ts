import { ROUTES } from '@/shared/constants/routes';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export interface BreadcrumbItem {
  title: string;
  path?: string;
}

export const useBreadcrumb = (): BreadcrumbItem[] => {
  const location = useLocation();

  const breadcrumbs = useMemo(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const items: BreadcrumbItem[] = [];

    // Add home breadcrumb
    items.push({
      title: 'Home',
      path: ROUTES.DASHBOARD,
    });

    // Build breadcrumbs from path segments
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      // Map path segments to readable titles
      const title = segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      items.push({
        title,
        path: index === pathSegments.length - 1 ? undefined : currentPath,
      });
    });

    return items;
  }, [location.pathname]);

  return breadcrumbs;
};
