import { useResponsive } from '@/shared/hooks/useResponsive';
import { App, NotificationArgsProps } from 'antd';
import React from 'react';

interface NotificationProps
  extends Omit<NotificationArgsProps, 'message' | 'description'> {
  title: string;
  content?: React.ReactNode;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  showCloseIcon?: boolean;
  placement?:
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'top'
    | 'bottom';
  action?: React.ReactNode;
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  title,
  content,
  type = 'info',
  duration = 4.5,
  showCloseIcon = true,
  placement = 'topRight',
  action,
  onClose,
  ...props
}) => {
  const { isMobile } = useResponsive();
  const { notification } = App.useApp();

  const openNotification = () => {
    notification[type]({
      message: title,
      description: content,
      duration,
      placement,
      closable: showCloseIcon,
      style: {
        width: isMobile ? '90vw' : '400px',
        maxWidth: isMobile ? '90vw' : '400px',
      },
      ...props,
    });
  };

  // This component should not render anything, it's just a utility
  return null;
};

export const useNotification = () => {
  const { isMobile } = useResponsive();
  const { notification } = App.useApp();

  const showNotification = (
    title: string,
    content?: React.ReactNode,
    type: 'success' | 'error' | 'info' | 'warning' = 'info',
    options?: Partial<NotificationArgsProps>
  ) => {
    notification[type]({
      message: title,
      description: content,
      duration: 4.5,
      placement: 'topRight',
      style: {
        width: isMobile ? '90vw' : '400px',
        maxWidth: isMobile ? '90vw' : '400px',
      },
      ...options,
    });
  };

  const showSuccess = (
    title: string,
    content?: React.ReactNode,
    options?: Partial<NotificationArgsProps>
  ) => {
    showNotification(title, content, 'success', options);
  };

  const showError = (
    title: string,
    content?: React.ReactNode,
    options?: Partial<NotificationArgsProps>
  ) => {
    showNotification(title, content, 'error', options);
  };

  const showInfo = (
    title: string,
    content?: React.ReactNode,
    options?: Partial<NotificationArgsProps>
  ) => {
    showNotification(title, content, 'info', options);
  };

  const showWarning = (
    title: string,
    content?: React.ReactNode,
    options?: Partial<NotificationArgsProps>
  ) => {
    showNotification(title, content, 'warning', options);
  };

  return {
    showNotification,
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };
};

export default Notification;
