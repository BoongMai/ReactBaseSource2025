import { ROUTES } from '@/shared/constants/routes';
import { useCommonTranslation } from '@/shared/hooks/useTranslation';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface BreadcrumbItem {
  title: string;
  path?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  showHome?: boolean;
  separator?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  showHome = true,
  separator = '/',
  className,
  style,
}) => {
  const location = useLocation();
  const { navigation } = useCommonTranslation();

  // Auto-generate breadcrumb from current route if items not provided
  const generateBreadcrumbItems = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbItems: BreadcrumbItem[] = [];

    // Add home if showHome is true
    if (showHome) {
      breadcrumbItems.push({
        title: navigation.home,
        path: ROUTES.HOME,
      });
    }

    // Generate breadcrumb items based on current path
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      // Map path segments to titles
      let title = segment;
      let path = currentPath;

      // Handle specific routes
      switch (currentPath) {
        case ROUTES.DASHBOARD:
          title = navigation.dashboard;
          break;
        case ROUTES.PROFILE:
          title = navigation.profile;
          break;
        case ROUTES.SETTINGS:
          title = navigation.settings;
          break;
        case ROUTES.ADVANCED_TABLE:
          title = navigation.advancedTable;
          break;
        case ROUTES.FORM_DEMO:
          title = navigation.formDemo;
          break;
        case ROUTES.CHART_DEMO:
          title = navigation.chartDemo;
          break;
        case ROUTES.LOADING_DEMO:
          title = navigation.loadingDemo;
          break;
        case ROUTES.TEST_TABLE:
          title = navigation.testTable;
          break;
        default:
          // Handle dynamic routes (e.g., /profile/123)
          if (segment.match(/^\d+$/)) {
            title = `ID: ${segment}`;
            path = ''; // Don't make it clickable
          } else {
            // Capitalize first letter and replace hyphens with spaces
            title = segment
              .split('-')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
          }
      }

      // Don't add home again if it's already added
      if (currentPath === ROUTES.HOME && showHome) {
        return;
      }

      breadcrumbItems.push({
        title,
        path: path === currentPath ? undefined : path,
      });
    });

    return breadcrumbItems;
  };

  const breadcrumbItems = items || generateBreadcrumbItems();

  return (
    <AntBreadcrumb
      separator={separator}
      className={className}
      style={style}
      items={breadcrumbItems.map((item, index) => ({
        title: item.path ? (
          <Link to={item.path} style={{ color: 'inherit' }}>
            {item.icon && <span style={{ marginRight: 4 }}>{item.icon}</span>}
            {item.title}
          </Link>
        ) : (
          <span>
            {item.icon && <span style={{ marginRight: 4 }}>{item.icon}</span>}
            {item.title}
          </span>
        ),
      }))}
    />
  );
};

export default Breadcrumb;
