import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Tag } from 'antd';
import React from 'react';
import { NewFeatItem } from '../services/newFeat.api';
import styles from './NewFeatCard.module.scss';

interface NewFeatCardProps {
  item: NewFeatItem;
  onEdit: (item: NewFeatItem) => void;
  onDelete: (id: string) => void;
}

const NewFeatCard: React.FC<NewFeatCardProps> = ({
  item,
  onEdit,
  onDelete,
}) => {
  return (
    <Card
      className={styles.card}
      title={item.name}
      extra={
        <Tag color={item.status === 'active' ? 'green' : 'red'}>
          {item.status.toUpperCase()}
        </Tag>
      }
      actions={[
        <Button
          key='edit'
          type='text'
          icon={<EditOutlined />}
          onClick={() => onEdit(item)}
        >
          Edit
        </Button>,
        <Button
          key='delete'
          type='text'
          danger
          icon={<DeleteOutlined />}
          onClick={() => onDelete(item.id)}
        >
          Delete
        </Button>,
      ]}
    >
      <p className={styles.description}>{item.description}</p>
      <div className={styles.meta}>
        <span>Created: {new Date(item.createdAt).toLocaleDateString()}</span>
        <span>Updated: {new Date(item.updatedAt).toLocaleDateString()}</span>
      </div>
    </Card>
  );
};

export default NewFeatCard;
