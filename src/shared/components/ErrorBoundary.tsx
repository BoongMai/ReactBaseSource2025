import { useNotification } from '@/shared/components/ui';
import { Button, Card, Collapse, Result, Space, Typography } from 'antd';
import { Component, ErrorInfo, ReactNode } from 'react';

const { Text, Paragraph } = Typography;
const { Panel } = Collapse;

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  level?: 'page' | 'component' | 'critical';
  showDetails?: boolean;
  enableRetry?: boolean;
  enableReport?: boolean;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId?: string;
  retryCount: number;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Generate unique error ID
    const errorId = this.generateErrorId();

    // Update state with error info and ID
    this.setState({
      errorInfo,
      errorId,
      retryCount: this.state.retryCount + 1,
    });

    // Log to error reporting service
    this.logErrorToService(error, errorInfo, errorId);

    // Call custom error handler
    this.props.onError?.(error, errorInfo);
  }

  private generateErrorId = (): string => {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  private logErrorToService = async (
    error: Error,
    errorInfo: ErrorInfo,
    errorId: string
  ) => {
    try {
      // Simple error logging - in production, integrate with error reporting service
      console.error('Error logged:', {
        error: error.toString(),
        errorInfo,
        errorId,
        level: this.props.level || 'component',
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        retryCount: this.state.retryCount,
      });
    } catch (reportingError) {
      console.error('Failed to log error:', reportingError);
    }
  };

  private handleRetry = () => {
    if (this.state.retryCount < 3) {
      this.setState({
        hasError: false,
        error: undefined,
        errorInfo: undefined,
        errorId: undefined,
      });
    } else {
      this.handleReload();
    }
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleReportError = async () => {
    if (this.state.error && this.state.errorId) {
      try {
        // Simple error reporting - in production, integrate with error reporting service
        console.log('Error reported by user:', {
          errorId: this.state.errorId,
          feedback: 'User reported error',
          severity: 'high',
        });
        alert('Error reported successfully. Thank you for your feedback!');
      } catch (error) {
        console.error('Failed to report error feedback:', error);
      }
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const {
        level = 'component',
        showDetails = true,
        enableRetry = true,
        enableReport = true,
      } = this.props;
      const { error, errorInfo, errorId, retryCount } = this.state;

      const getErrorTitle = () => {
        switch (level) {
          case 'critical':
            return 'Critical Error';
          case 'page':
            return 'Page Error';
          default:
            return 'Component Error';
        }
      };

      const getErrorSubtitle = () => {
        if (retryCount >= 3) {
          return 'Multiple retry attempts failed. Please reload the page or contact support.';
        }
        return "We're sorry, but something unexpected happened. Please try again.";
      };

      return (
        <Result
          status='error'
          title={getErrorTitle()}
          subTitle={getErrorSubtitle()}
          extra={[
            enableRetry && retryCount < 3 && (
              <Button type='primary' key='retry' onClick={this.handleRetry}>
                Try Again ({3 - retryCount} attempts left)
              </Button>
            ),
            <Button key='reload' onClick={this.handleReload}>
              Reload Page
            </Button>,
            enableReport && errorId && (
              <Button key='report' onClick={this.handleReportError}>
                Report Error
              </Button>
            ),
          ].filter(Boolean)}
        >
          {errorId && (
            <Card size='small' style={{ marginTop: 16, textAlign: 'center' }}>
              <Text type='secondary'>Error ID: {errorId}</Text>
            </Card>
          )}

          {showDetails &&
            (import.meta.env.DEV || level === 'critical') &&
            error && (
              <div style={{ marginTop: 16, textAlign: 'left' }}>
                <Collapse size='small'>
                  <Panel header='Error Details' key='error'>
                    <Space direction='vertical' style={{ width: '100%' }}>
                      <div>
                        <Text strong>Error Message:</Text>
                        <pre
                          style={{
                            color: 'red',
                            fontSize: '12px',
                            background: '#f5f5f5',
                            padding: '8px',
                            borderRadius: '4px',
                            marginTop: '4px',
                          }}
                        >
                          {error.toString()}
                        </pre>
                      </div>

                      {errorInfo && (
                        <div>
                          <Text strong>Component Stack:</Text>
                          <pre
                            style={{
                              fontSize: '12px',
                              background: '#f5f5f5',
                              padding: '8px',
                              borderRadius: '4px',
                              marginTop: '4px',
                              whiteSpace: 'pre-wrap',
                            }}
                          >
                            {errorInfo.componentStack}
                          </pre>
                        </div>
                      )}

                      <div>
                        <Text strong>Retry Count:</Text> {retryCount}
                      </div>
                    </Space>
                  </Panel>
                </Collapse>
              </div>
            )}

          {level === 'critical' && (
            <Card
              size='small'
              style={{
                marginTop: 16,
                background: '#fff2f0',
                border: '1px solid #ffccc7',
              }}
            >
              <Paragraph style={{ margin: 0, color: '#a8071a' }}>
                <Text strong>Critical Error:</Text> This error affects core
                functionality. Please contact support if the issue persists.
              </Paragraph>
            </Card>
          )}
        </Result>
      );
    }

    return this.props.children;
  }
}

// Hook for functional components
export const useErrorHandler = () => {
  const { showError } = useNotification();

  const handleError = (error: Error, context?: string) => {
    console.error('Error caught by useErrorHandler:', error);

    // Show user-friendly error message
    showError(
      'Something went wrong',
      context ? `${context}: ${error.message}` : error.message
    );

    // Log to service
    if (import.meta.env.PROD) {
      console.log('Error logged to service:', { error, context });
    }
  };

  return { handleError };
};

export default ErrorBoundary;
