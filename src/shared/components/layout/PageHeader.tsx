import AdvancedBreadcrumb from '@/shared/components/ui/AdvancedBreadcrumb';
import { useBreadcrumb } from '@/shared/hooks/useBreadcrumb';
import { Space, Typography } from 'antd';
import React from 'react';

const { Title, Text } = Typography;

interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  extra?: React.ReactNode;
  showBreadcrumb?: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
  breadcrumbItems?: any[];
  className?: string;
  style?: React.CSSProperties;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  extra,
  showBreadcrumb = true,
  showBackButton = false,
  onBack,
  breadcrumbItems,
  className,
  style,
}) => {
  const breadcrumbs = useBreadcrumb();
  const currentPage = breadcrumbs[breadcrumbs.length - 1];

  const pageTitle = title || currentPage?.title || 'Page';
  const pageSubtitle = subtitle;

  return (
    <div
      className={className}
      style={{
        padding: '16px 24px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #f0f0f0',
        ...style,
      }}
    >
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        {/* Breadcrumb */}
        {showBreadcrumb && (
          <AdvancedBreadcrumb
            items={breadcrumbItems}
            showHome={true}
            showBackButton={showBackButton}
            onBack={onBack}
          />
        )}

        {/* Page Title and Actions */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginTop: showBreadcrumb ? 8 : 0,
          }}
        >
          <div>
            <Title level={2} style={{ margin: 0, marginBottom: 4 }}>
              {pageTitle}
            </Title>
            {pageSubtitle && (
              <Text type="secondary" style={{ fontSize: '16px' }}>
                {pageSubtitle}
              </Text>
            )}
          </div>
          {extra && <div>{extra}</div>}
        </div>
      </Space>
    </div>
  );
};

export default PageHeader;
