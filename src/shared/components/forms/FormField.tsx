import { Form, FormItemProps } from 'antd';
import React from 'react';

interface FormFieldProps extends Omit<FormItemProps, 'children'> {
  children: React.ReactNode;
  required?: boolean;
  help?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  children,
  required = false,
  help,
  ...props
}) => {
  return (
    <Form.Item
      {...props}
      required={required}
      help={help}
    >
      {children}
    </Form.Item>
  );
};

export default FormField;
