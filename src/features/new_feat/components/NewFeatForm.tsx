import { Button, Form, Input, Select, Space } from 'antd';
import React from 'react';
import {
  CreateNewFeatData,
  NewFeatItem,
  UpdateNewFeatData,
} from '../services/newFeat.api';

interface NewFeatFormProps {
  initialValues?: NewFeatItem;
  onSubmit: (values: CreateNewFeatData | UpdateNewFeatData) => void;
  onCancel: () => void;
  loading?: boolean;
}

const NewFeatForm: React.FC<NewFeatFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout='vertical'
      initialValues={initialValues}
      onFinish={handleSubmit}
    >
      <Form.Item
        name='name'
        label='Name'
        rules={[
          { required: true, message: 'Please input name!' },
          { min: 2, message: 'Name must be at least 2 characters!' },
        ]}
      >
        <Input placeholder='Enter name' />
      </Form.Item>

      <Form.Item
        name='description'
        label='Description'
        rules={[
          { required: true, message: 'Please input description!' },
          { min: 10, message: 'Description must be at least 10 characters!' },
        ]}
      >
        <Input.TextArea placeholder='Enter description' rows={4} />
      </Form.Item>

      {initialValues && (
        <Form.Item
          name='status'
          label='Status'
          rules={[{ required: true, message: 'Please select status!' }]}
        >
          <Select placeholder='Select status'>
            <Select.Option value='active'>Active</Select.Option>
            <Select.Option value='inactive'>Inactive</Select.Option>
          </Select>
        </Form.Item>
      )}

      <Form.Item>
        <Space>
          <Button type='primary' htmlType='submit' loading={loading}>
            {initialValues ? 'Update' : 'Create'}
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default NewFeatForm;
