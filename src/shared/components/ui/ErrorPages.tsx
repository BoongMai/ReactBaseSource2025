import { ROUTES } from '@/shared/constants/routes';
import { HomeOutlined, ReloadOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Card, Col, Result, Row, Space, Typography } from 'antd';
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

interface ErrorPageProps {
  errorCode?: string;
  title?: string;
  description?: string;
  showRetry?: boolean;
  showHome?: boolean;
  showContact?: boolean;
  customActions?: React.ReactNode;
}

// 404 Not Found Page
export const NotFoundPage: React.FC<ErrorPageProps> = memo(
  ({
    title = 'Page Not Found',
    description = "The page you're looking for doesn't exist or has been moved.",
    showRetry = false,
    showHome = true,
    showContact = true,
    customActions,
  }) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate(-1);
    };

    const defaultActions = (
      <Space direction='vertical' size='middle' style={{ width: '100%' }}>
        <Space wrap>
          {showHome && (
            <Button type='primary' icon={<HomeOutlined />} href={ROUTES.HOME}>
              Go Home
            </Button>
          )}
          <Button icon={<ReloadOutlined />} onClick={handleGoBack}>
            Go Back
          </Button>
          {showRetry && (
            <Button onClick={() => window.location.reload()}>Retry</Button>
          )}
        </Space>

        {showContact && (
          <Card
            size='small'
            style={{ textAlign: 'center', background: '#f9f9f9' }}
          >
            <Text type='secondary'>
              Still having trouble?{' '}
              <Button type='link' size='small'>
                Contact Support
              </Button>
            </Text>
          </Card>
        )}
      </Space>
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
        <Row justify='center' style={{ width: '100%', maxWidth: 600 }}>
          <Col xs={24}>
            <Result
              status='404'
              title={title}
              subTitle={description}
              extra={customActions || defaultActions}
            >
              <div style={{ textAlign: 'center', marginTop: 24 }}>
                <Text type='secondary'>Error Code: 404</Text>
              </div>
            </Result>
          </Col>
        </Row>
      </div>
    );
  }
);

// 500 Internal Server Error Page
export const ServerErrorPage: React.FC<ErrorPageProps> = memo(
  ({
    title = 'Internal Server Error',
    description = "Something went wrong on our end. We're working to fix it.",
    showRetry = true,
    showHome = true,
    showContact = true,
    customActions,
  }) => {
    const handleRetry = () => {
      window.location.reload();
    };

    const defaultActions = (
      <Space direction='vertical' size='middle' style={{ width: '100%' }}>
        <Space wrap>
          {showHome && (
            <Button type='primary' icon={<HomeOutlined />} href={ROUTES.HOME}>
              Go Home
            </Button>
          )}
          {showRetry && (
            <Button icon={<ReloadOutlined />} onClick={handleRetry}>
              Try Again
            </Button>
          )}
        </Space>

        {showContact && (
          <Card
            size='small'
            style={{
              textAlign: 'center',
              background: '#fff2f0',
              border: '1px solid #ffccc7',
            }}
          >
            <Text type='secondary' style={{ color: '#a8071a' }}>
              <SendOutlined /> This error has been reported to our team.
              <Button type='link' size='small' style={{ color: '#a8071a' }}>
                Contact Support
              </Button>
            </Text>
          </Card>
        )}
      </Space>
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
        <Row justify='center' style={{ width: '100%', maxWidth: 600 }}>
          <Col xs={24}>
            <Result
              status='500'
              title={title}
              subTitle={description}
              extra={customActions || defaultActions}
            >
              <div style={{ textAlign: 'center', marginTop: 24 }}>
                <Text type='secondary'>Error Code: 500</Text>
              </div>
            </Result>
          </Col>
        </Row>
      </div>
    );
  }
);

// Network Error Page
export const NetworkErrorPage: React.FC<ErrorPageProps> = memo(
  ({
    title = 'Network Error',
    description = 'Please check your internet connection and try again.',
    showRetry = true,
    showHome = true,
    showContact = false,
    customActions,
  }) => {
    const handleRetry = () => {
      window.location.reload();
    };

    const defaultActions = (
      <Space direction='vertical' size='middle' style={{ width: '100%' }}>
        <Space wrap>
          {showHome && (
            <Button type='primary' icon={<HomeOutlined />} href={ROUTES.HOME}>
              Go Home
            </Button>
          )}
          {showRetry && (
            <Button icon={<ReloadOutlined />} onClick={handleRetry}>
              Retry Connection
            </Button>
          )}
        </Space>

        <Card
          size='small'
          style={{
            textAlign: 'center',
            background: '#f6ffed',
            border: '1px solid #b7eb8f',
          }}
        >
          <Text type='secondary' style={{ color: '#389e0d' }}>
            💡 Try checking your internet connection or switching networks
          </Text>
        </Card>
      </Space>
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
        <Row justify='center' style={{ width: '100%', maxWidth: 600 }}>
          <Col xs={24}>
            <Result
              status='warning'
              title={title}
              subTitle={description}
              extra={customActions || defaultActions}
            >
              <div style={{ textAlign: 'center', marginTop: 24 }}>
                <Text type='secondary'>Network Error</Text>
              </div>
            </Result>
          </Col>
        </Row>
      </div>
    );
  }
);

// Maintenance Page
export const MaintenancePage: React.FC<ErrorPageProps> = memo(
  ({
    title = 'Under Maintenance',
    description = "We're currently performing scheduled maintenance. We'll be back soon!",
    showRetry = true,
    showHome = false,
    showContact = true,
    customActions,
  }) => {
    const handleRetry = () => {
      window.location.reload();
    };

    const defaultActions = (
      <Space direction='vertical' size='middle' style={{ width: '100%' }}>
        <Space wrap>
          {showRetry && (
            <Button icon={<ReloadOutlined />} onClick={handleRetry}>
              Check Again
            </Button>
          )}
        </Space>

        {showContact && (
          <Card
            size='small'
            style={{
              textAlign: 'center',
              background: '#e6f7ff',
              border: '1px solid #91d5ff',
            }}
          >
            <Text type='secondary' style={{ color: '#0050b3' }}>
              <SendOutlined /> Need immediate assistance?
              <Button type='link' size='small' style={{ color: '#0050b3' }}>
                Contact Support
              </Button>
            </Text>
          </Card>
        )}
      </Space>
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
        <Row justify='center' style={{ width: '100%', maxWidth: 600 }}>
          <Col xs={24}>
            <Result
              status='info'
              title={title}
              subTitle={description}
              extra={customActions || defaultActions}
            >
              <div style={{ textAlign: 'center', marginTop: 24 }}>
                <Text type='secondary'>Maintenance Mode</Text>
              </div>
            </Result>
          </Col>
        </Row>
      </div>
    );
  }
);

// Generic Error Page
export const GenericErrorPage: React.FC<ErrorPageProps> = memo(
  ({
    errorCode = 'ERROR',
    title = 'Something Went Wrong',
    description = 'An unexpected error occurred. Please try again or contact support if the problem persists.',
    showRetry = true,
    showHome = true,
    showContact = true,
    customActions,
  }) => {
    const navigate = useNavigate();

    const handleRetry = () => {
      window.location.reload();
    };

    const handleGoHome = () => {
      navigate(ROUTES.HOME);
    };

    const defaultActions = (
      <Space direction='vertical' size='middle' style={{ width: '100%' }}>
        <Space wrap>
          {showHome && (
            <Button
              type='primary'
              icon={<HomeOutlined />}
              onClick={handleGoHome}
            >
              Go Home
            </Button>
          )}
          {showRetry && (
            <Button icon={<ReloadOutlined />} onClick={handleRetry}>
              Try Again
            </Button>
          )}
        </Space>

        {showContact && (
          <Card
            size='small'
            style={{ textAlign: 'center', background: '#f9f9f9' }}
          >
            <Text type='secondary'>
              <SendOutlined /> Need help?
              <Button type='link' size='small'>
                Contact Support
              </Button>
            </Text>
          </Card>
        )}
      </Space>
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
        <Row justify='center' style={{ width: '100%', maxWidth: 600 }}>
          <Col xs={24}>
            <Result
              status='error'
              title={title}
              subTitle={description}
              extra={customActions || defaultActions}
            >
              <div style={{ textAlign: 'center', marginTop: 24 }}>
                <Text type='secondary'>Error Code: {errorCode}</Text>
              </div>
            </Result>
          </Col>
        </Row>
      </div>
    );
  }
);

// Error Page Factory
export const createErrorPage = (
  type: '404' | '500' | 'network' | 'maintenance' | 'generic'
) => {
  switch (type) {
    case '404':
      return NotFoundPage;
    case '500':
      return ServerErrorPage;
    case 'network':
      return NetworkErrorPage;
    case 'maintenance':
      return MaintenancePage;
    default:
      return GenericErrorPage;
  }
};

NotFoundPage.displayName = 'NotFoundPage';
ServerErrorPage.displayName = 'ServerErrorPage';
NetworkErrorPage.displayName = 'NetworkErrorPage';
MaintenancePage.displayName = 'MaintenancePage';
GenericErrorPage.displayName = 'GenericErrorPage';
