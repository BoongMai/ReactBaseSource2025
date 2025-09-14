import React from 'react';
import { useParams } from 'react-router-dom';

const ProfileDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div style={{ padding: '20px' }}>
      <h2>Profile Detail Page</h2>
      <p>Profile ID: {id}</p>
    </div>
  );
};

export default ProfileDetail;
