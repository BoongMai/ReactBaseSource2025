import { useResponsive } from '@/shared/hooks/useResponsive';
import { Drawer as AntDrawer, DrawerProps as AntDrawerProps } from 'antd';
import React from 'react';

interface DrawerProps extends Omit<AntDrawerProps, 'width'> {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showCloseIcon?: boolean;
  showFooter?: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  loading?: boolean;
  danger?: boolean;
  width?: number | string;
  fullScreen?: boolean;
  placement?: 'top' | 'right' | 'bottom' | 'left';
}

const Drawer: React.FC<DrawerProps> = ({
  children,
  title,
  description,
  showCloseIcon = true,
  showFooter = false,
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
  danger = false,
  width,
  fullScreen = false,
  placement = 'right',
  ...props
}) => {
  const { isMobile, isTablet } = useResponsive();

  const getWidth = () => {
    if (fullScreen) return '100vw';
    if (isMobile) return '100vw';
    if (isTablet) return '80vw';
    return width || 400;
  };

  const getHeight = () => {
    if (fullScreen) return '100vh';
    if (placement === 'top' || placement === 'bottom') {
      return isMobile ? '80vh' : '60vh';
    }
    return undefined;
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      props.onClose?.(null as any);
    }
  };

  const handleOk = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  return (
    <AntDrawer
      {...props}
      title={title}
      width={getWidth()}
      height={getHeight()}
      placement={placement}
      closable={showCloseIcon}
      onClose={handleCancel}
      footer={
        showFooter ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '8px',
              padding: isMobile ? '12px 16px' : '16px 24px',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <button
              onClick={handleCancel}
              style={{
                padding: '6px 16px',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                background: 'var(--color-bg)',
                color: 'var(--color-text)',
                cursor: 'pointer',
                fontSize: isMobile ? '14px' : '16px',
              }}
            >
              {cancelText}
            </button>
            <button
              onClick={handleOk}
              disabled={loading}
              style={{
                padding: '6px 16px',
                border: 'none',
                borderRadius: '6px',
                background: danger ? '#ff4d4f' : '#1890ff',
                color: '#fff',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: isMobile ? '14px' : '16px',
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? 'Loading...' : confirmText}
            </button>
          </div>
        ) : undefined
      }
      styles={{
        body: {
          padding: isMobile ? '16px' : '24px',
          maxHeight: fullScreen
            ? 'calc(100vh - 120px)'
            : isMobile
            ? 'calc(100vh - 120px)'
            : 'calc(100vh - 120px)',
          overflowY: 'auto',
        },
        header: {
          padding: isMobile ? '12px 16px' : '16px 24px',
          borderBottom: '1px solid var(--color-border)',
        },
        ...props.styles,
      }}
    >
      {description && (
        <div
          style={{
            marginBottom: '16px',
            color: 'var(--color-text-secondary)',
            fontSize: isMobile ? '14px' : '16px',
          }}
        >
          {description}
        </div>
      )}
      {children}
    </AntDrawer>
  );
};

export default Drawer;
