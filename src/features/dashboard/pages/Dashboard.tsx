import { Card, Col, Row, Statistic, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2} style={{ marginBottom: '24px' }}>
        Dashboard
      </Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng người dùng"
              value={1128}
              valueStyle={{ color: '#3f8600' }}
              suffix="người"
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Doanh thu tháng"
              value={112893}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix="₫"
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Giao dịch"
              value={93}
              valueStyle={{ color: '#1890ff' }}
              suffix="giao dịch"
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tỷ lệ thành công"
              value={98.5}
              precision={1}
              valueStyle={{ color: '#3f8600' }}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={12}>
          <Card title="Biểu đồ doanh thu" size="small">
            <div
              style={{
                height: 300,
                background: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              📊 Revenue Chart Placeholder
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Hoạt động gần đây" size="small">
            <div
              style={{
                height: 300,
                background: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              📋 Recent Activity Placeholder
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
