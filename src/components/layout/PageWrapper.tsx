import { Breadcrumb } from '@/shared/components/ui';
import { useBreadcrumb } from '@/shared/hooks';
import { useResponsive } from '@/shared/hooks/useResponsive';
import { Card, Space } from 'antd';
import React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
  showBreadcrumb?: boolean;
  breadcrumbType?: 'basic' | 'advanced';
  title?: string;
  subtitle?: string;
  extra?: React.ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  showBreadcrumb = true,
  breadcrumbType = 'basic',
  title,
  subtitle,
  extra,
  showBackButton = false,
  onBack,
  className,
  style,
}) => {
  const breadcrumb = useBreadcrumb();
  const { isMobile, isTablet } = useResponsive();

  const pageTitle = title || breadcrumb?.[breadcrumb.length - 1]?.title || '';
  const pageSubtitle = subtitle || '';

  return (
    <div className={className} style={style}>
      <Space
        direction='vertical'
        size={isMobile ? 'small' : 'middle'}
        style={{ width: '100%' }}
      >
        {/* Breadcrumb */}
        {showBreadcrumb && (
          <div>
            <Breadcrumb />
          </div>
        )}

        {/* Page Content */}
        <Card
          style={{
            backgroundColor: 'var(--color-card-bg)',
            color: 'var(--color-card-text)',
            border: '1px solid var(--color-card-border)',
            boxShadow: 'var(--color-card-shadow)',
            borderRadius: isMobile ? 'var(--radius-md)' : 'var(--radius-lg)',
          }}
          styles={{
            body: {
              padding: isMobile ? '12px' : isTablet ? '16px' : '24px',
            },
          }}
        >
          {children}
        </Card>
      </Space>
    </div>
  );
};

export default PageWrapper;
