import { useResponsive } from '@/shared/hooks/useResponsive';
import { ExclamationCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Modal, ModalProps } from 'antd';
import React from 'react';

interface ConfirmModalProps extends Omit<ModalProps, 'onOk' | 'onCancel'> {
  title?: string;
  content: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
  danger?: boolean;
  type?: 'confirm' | 'warning' | 'danger';
  icon?: React.ReactNode;
  showCancel?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  content,
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
  danger = false,
  type = 'confirm',
  icon,
  showCancel = true,
  ...props
}) => {
  const { isMobile } = useResponsive();

  const getIcon = () => {
    if (icon) return icon;

    switch (type) {
      case 'warning':
        return <ExclamationCircleOutlined style={{ color: '#faad14' }} />;
      case 'danger':
        return <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />;
      default:
        return <QuestionCircleOutlined style={{ color: '#1890ff' }} />;
    }
  };

  const getTitle = () => {
    if (title) return title;

    switch (type) {
      case 'warning':
        return 'Warning';
      case 'danger':
        return 'Danger';
      default:
        return 'Confirm';
    }
  };

  const handleConfirm = async () => {
    try {
      await onConfirm();
    } catch (error) {
      console.error('Confirm action failed:', error);
    }
  };

  return (
    <Modal
      {...props}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {getIcon()}
          <span>{getTitle()}</span>
        </div>
      }
      onOk={handleConfirm}
      onCancel={onCancel}
      okText={confirmText}
      cancelText={cancelText}
      confirmLoading={loading}
      okButtonProps={{
        danger: danger || type === 'danger',
        loading,
        ...props.okButtonProps,
      }}
      cancelButtonProps={{
        style: { display: showCancel ? 'inline-flex' : 'none' },
        ...props.cancelButtonProps,
      }}
      width={isMobile ? '90vw' : 400}
      centered
    >
      <div
        style={{
          fontSize: isMobile ? '14px' : '16px',
          lineHeight: '1.5',
          color: 'var(--color-text)',
        }}
      >
        {content}
      </div>
    </Modal>
  );
};

export default ConfirmModal;
