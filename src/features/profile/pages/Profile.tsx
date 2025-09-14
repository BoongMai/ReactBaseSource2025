import useAuthStore from '@/features/auth/store/authStore';
import { Card } from 'antd';
import React from 'react';

const Profile: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  return (
    <Card style={{ maxWidth: 800, margin: '20px auto' }}>
      <h3>Profile</h3>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
    </Card>
  );
};

export default Profile;
