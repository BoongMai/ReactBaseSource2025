import { Button, Space, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div
      style={{
        display: 'flex',
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
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <Title level={1} style={{ color: '#666', marginBottom: '16px' }}>
          404
        </Title>

        <Title level={3} style={{ color: '#333', marginBottom: '16px' }}>
          Not Found
        </Title>

        <Space size='middle'>
          <Button type='primary' size='large' onClick={handleGoHome}>
            Home Page
          </Button>

          <Button size='large' onClick={handleGoBack}>
            Back Page
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default NotFound;
