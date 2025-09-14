import { Spin, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

interface PageLoadingProps {
  message?: string;
  size?: 'small' | 'default' | 'large';
}

const PageLoading: React.FC<PageLoadingProps> = ({
  message,
  size = 'large',
}) => {
  const { t } = useTranslation();
  const loadingMessage = message || t('loading.appLoading');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          maxWidth: '300px',
          width: '100%',
        }}
      >
        {/* Spinner */}
        <Spin size={size} />

        {/* Message */}
        <div style={{ marginTop: '16px' }}>
          <Text
            style={{
              fontSize: '16px',
              color: '#666',
            }}
          >
            {loadingMessage}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default PageLoading;
