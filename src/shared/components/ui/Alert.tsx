import { useResponsive } from '@/shared/hooks/useResponsive';
import { Alert as AntAlert, AlertProps as AntAlertProps } from 'antd';
import React from 'react';

interface AlertProps extends Omit<AntAlertProps, 'message'> {
  title?: string;
  content: React.ReactNode;
  type?: 'success' | 'info' | 'warning' | 'error';
  showIcon?: boolean;
  closable?: boolean;
  onClose?: () => void;
  action?: React.ReactNode;
  fullWidth?: boolean;
  variant?: 'filled' | 'outlined' | 'text';
}

const Alert: React.FC<AlertProps> = ({
  title,
  content,
  type = 'info',
  showIcon = true,
  closable = false,
  onClose,
  action,
  fullWidth = false,
  variant = 'outlined',
  ...props
}) => {
  const { isMobile } = useResponsive();

  const getVariantStyles = () => {
    switch (variant) {
      case 'filled':
        return {
          backgroundColor: `var(--color-${type}-bg)`,
          border: 'none',
          color: `var(--color-${type})`,
        };
      case 'text':
        return {
          backgroundColor: 'transparent',
          border: 'none',
          color: `var(--color-${type})`,
        };
      default: // outlined
        return {
          backgroundColor: 'var(--color-bg)',
          border: `1px solid var(--color-${type}-border)`,
          color: 'var(--color-text)',
        };
    }
  };

  return (
    <AntAlert
      {...props}
      message={
        title ? (
          <div
            style={{
              fontWeight: 'bold',
              fontSize: isMobile ? '14px' : '16px',
              marginBottom: content ? '4px' : '0',
            }}
          >
            {title}
          </div>
        ) : undefined
      }
      description={
        <div
          style={{
            fontSize: isMobile ? '13px' : '14px',
            lineHeight: '1.5',
          }}
        >
          {content}
        </div>
      }
      type={type}
      showIcon={showIcon}
      closable={closable}
      onClose={onClose}
      action={action}
      style={{
        width: fullWidth ? '100%' : 'auto',
        fontSize: isMobile ? '13px' : '14px',
        ...getVariantStyles(),
        ...props.style,
      }}
    />
  );
};

export default Alert;
