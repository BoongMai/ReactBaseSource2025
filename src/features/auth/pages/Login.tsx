import useAuthStore from '@/features/auth/store/authStore';
import { ROUTES } from '@/shared/constants/routes';
import { UserRole } from '@/shared/constants/userRoles';
import { Button, Card, Form, Input, Typography, message } from 'antd';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const onFinish = useCallback(
    async (values: any) => {
      const { email, password } = values;

      const accounts = {
        admin: {
          id: '1',
          email: 'admin',
          name: 'Admin',
          role: UserRole.ADMIN,
        },
        user: {
          id: '2',
          email: 'user',
          name: 'User',
          role: UserRole.USER,
        },
        demo: {
          id: '3',
          email: 'demo',
          name: 'Demo',
          role: UserRole.DEMO,
        },
      };

      if (accounts[email as keyof typeof accounts] && password === '123456') {
        const userData = accounts[email as keyof typeof accounts];
        login('demo-jwt-token', userData);
        message.success(`Login successful as ${userData.name}!`);
        navigate(ROUTES.HOME);
      } else {
        message.error(
          'Invalid credentials! Use admin/user/demo with password 123456'
        );
      }
    },
    [login, navigate]
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <Card style={{ maxWidth: 400, width: '100%' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Login
        </Title>

        <div
          style={{ textAlign: 'center', marginBottom: '1rem', color: '#666' }}
        >
          <p>Demo accounts:</p>
          <p>
            <strong>Admin:</strong> admin / 123456 (Full access)
          </p>
          <p>
            <strong>User:</strong> user / 123456 (Limited access)
          </p>
          <p>
            <strong>Demo:</strong> demo / 123456 (Read only)
          </p>
        </div>

        <Form onFinish={onFinish} layout='vertical'>
          <Form.Item
            name='email'
            label='Username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder='Enter admin, user, or demo' />
          </Form.Item>

          <Form.Item
            name='password'
            label='Password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder='Enter your password' />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
