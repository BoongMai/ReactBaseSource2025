import { useResponsive } from '@/shared/hooks/useResponsive';
import { Modal as AntModal, ModalProps as AntModalProps } from 'antd';
import React from 'react';

interface ModalProps extends Omit<AntModalProps, 'width'> {
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
  centered?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  children,
  title,
  description,
  showCloseIcon = true,
  showFooter = true,
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
  danger = false,
  width,
  fullScreen = false,
  centered = true,
  ...props
}) => {
  const { isMobile, isTablet } = useResponsive();

  const getWidth = () => {
    if (fullScreen) return '100vw';
    if (isMobile) return '95vw';
    if (isTablet) return '80vw';
    return width || 520;
  };

  const getHeight = () => {
    if (fullScreen) return '100vh';
    if (isMobile) return '90vh';
    return undefined;
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      // props.onCancel?.(); // onCancel doesn't exist on Modal props
    }
  };

  const handleOk = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      props.onOk?.(null as any);
    }
  };

  return (
    <AntModal
      {...props}
      title={title}
      width={getWidth()}
      style={{
        ...props.style,
        height: getHeight(),
        maxHeight: fullScreen ? '100vh' : isMobile ? '90vh' : '80vh',
      }}
      centered={centered}
      closable={showCloseIcon}
      onCancel={handleCancel}
      onOk={showFooter ? handleOk : undefined}
      okText={confirmText}
      cancelText={cancelText}
      confirmLoading={loading}
      okButtonProps={{
        danger,
        loading,
        ...props.okButtonProps,
      }}
      cancelButtonProps={props.cancelButtonProps}
      footer={showFooter ? props.footer : null}
      styles={{
        body: {
          padding: isMobile ? '16px' : '24px',
          maxHeight: fullScreen
            ? 'calc(100vh - 120px)'
            : isMobile
            ? 'calc(90vh - 120px)'
            : 'calc(80vh - 120px)',
          overflowY: 'auto',
        },
        header: {
          padding: isMobile ? '12px 16px' : '16px 24px',
          borderBottom: '1px solid var(--color-border)',
        },
        footer: {
          padding: isMobile ? '12px 16px' : '16px 24px',
          borderTop: '1px solid var(--color-border)',
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
    </AntModal>
  );
};

export default Modal;
