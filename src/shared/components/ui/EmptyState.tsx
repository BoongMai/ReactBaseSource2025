import { Button, Result } from 'antd';
import React from 'react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Data',
  description = 'There is no data to display',
  actionText,
  onAction,
  icon
}) => {
  return (
    <Result
      icon={icon}
      title={title}
      subTitle={description}
      extra={
        actionText && onAction ? (
          <Button type="primary" onClick={onAction}>
            {actionText}
          </Button>
        ) : null
      }
    />
  );
};

export default EmptyState;
