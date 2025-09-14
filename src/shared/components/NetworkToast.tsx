import { App } from 'antd';
import { useEffect } from 'react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

const NetworkToast: React.FC = () => {
  const { isOnline } = useNetworkStatus();
  const { message } = App.useApp();

  useEffect(() => {
    if (!isOnline) {
      message.warning('Mất kết nối mạng', 2);
    } else {
      message.success('Đã kết nối lại mạng', 2);
    }
  }, [isOnline, message]);

  return null;
};

export default NetworkToast;
