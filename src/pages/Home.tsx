import DebugAuth from '@/components/DebugAuth';
import { envConfigs } from '@/config/env';
import { Alert, Button, Card, Space, Typography } from 'antd';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Home: React.FC = memo(() => {
  return (
    <div style={{ padding: '2rem' }}>
      <Card>
        <Title level={2}>Welcome to {envConfigs.APP_NAME}</Title>
        <Paragraph>
          This is a clean foundation for your rent payment management
          application. Start building your features here.
        </Paragraph>

        <Space direction='vertical' size='middle' style={{ marginTop: '20px' }}>
          <Title level={4}>PWA Features</Title>
          <Paragraph>
            This app now works offline! Test the PWA functionality:
          </Paragraph>
          <Space wrap>
            <Button>
              <Link to='/login'>Login (Offline Restricted)</Link>
            </Button>
            <Button>
              <Link to='/dashboard'>Dashboard (Offline Friendly)</Link>
            </Button>
            <Button>
              <Link to='/profile'>Profile (Offline Friendly)</Link>
            </Button>
            {import.meta.env.DEV && (
              <>
                <Button type='primary'>
                  <Link to='/offline-test'>Test Offline Mode</Link>
                </Button>
                <Button>
                  <Link to='/test-login'>Test Login</Link>
                </Button>
              </>
            )}
          </Space>

          <Alert
            message='Offline Behavior Test'
            description={
              <div>
                <p>
                  <strong>Offline Restricted Routes:</strong> /login, /register
                  - Will show offline page
                </p>
                <p>
                  <strong>Offline Friendly Routes:</strong> /, /dashboard,
                  /profile, /settings - Will work with cached data
                </p>
                <p>
                  <strong>Instructions:</strong> Turn off internet, then
                  navigate between routes to test
                </p>
              </div>
            }
            type='info'
            showIcon
          />
        </Space>

        {import.meta.env.DEV && <DebugAuth />}
      </Card>
    </div>
  );
});

Home.displayName = 'Home';

export default Home;
