import { envConfigs } from '@/config/env';
import { Button, Card, Form, Input, Select, Space, Switch, Typography } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const Settings: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Settings saved:', values);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={3} style={{ margin: 0 }}>
            Cài đặt hệ thống
          </Title>

          <Paragraph>Quản lý các cài đặt và cấu hình của hệ thống</Paragraph>

          <Form form={form} layout="vertical" onFinish={onFinish} style={{ maxWidth: 800 }}>
            <Card size="small" title="Cài đặt chung" style={{ marginBottom: 16 }}>
              <Form.Item label="Tên ứng dụng" name="appName" initialValue={envConfigs.APP_NAME}>
                <Input placeholder="Nhập tên ứng dụng" />
              </Form.Item>

              <Form.Item label="Ngôn ngữ" name="language" initialValue="vi">
                <Select>
                  <Option value="vi">Tiếng Việt</Option>
                  <Option value="en">English</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Múi giờ" name="timezone" initialValue="Asia/Ho_Chi_Minh">
                <Select>
                  <Option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh</Option>
                  <Option value="UTC">UTC</Option>
                </Select>
              </Form.Item>
            </Card>

            <Card size="small" title="Cài đặt bảo mật" style={{ marginBottom: 16 }}>
              <Form.Item
                label="Bật xác thực 2FA"
                name="twoFactorAuth"
                valuePropName="checked"
                initialValue={false}
              >
                <Switch />
              </Form.Item>

              <Form.Item
                label="Thời gian hết hạn session (phút)"
                name="sessionTimeout"
                initialValue={30}
              >
                <Input type="number" min={5} max={1440} />
              </Form.Item>
            </Card>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Lưu cài đặt
                </Button>
                <Button onClick={() => form.resetFields()}>Reset</Button>
              </Space>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export default Settings;
