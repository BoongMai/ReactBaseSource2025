import useAuthStore from '@/features/auth/store/authStore';
import { ROUTES } from '@/shared/constants/routes';
import { Button, Card, Form, Input, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const onFinish = async (values: any) => {
    const { name, email, password } = values;

    const demoUser = {
      id: `demo-user-${Date.now()}`,
      email: email,
      name: name,
    };

    login('demo-jwt-token', demoUser);
    navigate(ROUTES.HOME);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card style={{ maxWidth: 420, width: '100%' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Register
        </Title>
        <Form onFinish={onFinish} layout='vertical'>
          <Form.Item
            name='name'
            label='Full Name'
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input autoComplete='name' placeholder='Enter your full name' />
          </Form.Item>
          <Form.Item
            name='email'
            label='Email'
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input autoComplete='email' placeholder='Enter your email' />
          </Form.Item>
          <Form.Item
            name='password'
            label='Password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              autoComplete='new-password'
              placeholder='Enter your password'
            />
          </Form.Item>
          <Form.Item
            name='confirmPassword'
            label='Confirm Password'
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator: (_, value) => {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder='Confirm your password' />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' type='primary' block>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
