import useAuthStore from '@/features/auth/store/authStore';
import { Button, Card, Space, Typography } from 'antd';
import React from 'react';

const { Text, Title } = Typography;

const DebugAuth: React.FC = () => {
  const { user, token, login, logout } = useAuthStore();

  const handleTestLogin = () => {
    const demoUser = {
      id: 'demo-user-1',
      email: 'admin@test.com',
      name: 'Admin User',
    };

    login('demo-jwt-token', demoUser);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Card title='Debug Auth State' size='small' style={{ margin: '20px' }}>
      <Space direction='vertical' style={{ width: '100%' }}>
        <div>
          <Text strong>User: </Text>
          <Text code>{JSON.stringify(user, null, 2)}</Text>
        </div>

        <div>
          <Text strong>Token: </Text>
          <Text code>{token || 'null'}</Text>
        </div>

        <div>
          <Text strong>Is Authenticated: </Text>
          <Text type={user && token ? 'success' : 'danger'}>
            {user && token ? 'YES' : 'NO'}
          </Text>
        </div>

        <Space>
          <Button type='primary' onClick={handleTestLogin}>
            Test Login
          </Button>
          <Button onClick={handleLogout}>Logout</Button>
        </Space>
      </Space>
    </Card>
  );
};

export default DebugAuth;
