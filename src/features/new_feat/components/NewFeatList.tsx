import { Empty, List, Spin } from 'antd';
import React from 'react';
import { NewFeatItem } from '../services/newFeat.api';
import NewFeatCard from './NewFeatCard';

interface NewFeatListProps {
  items: NewFeatItem[];
  loading?: boolean;
  onEdit: (item: NewFeatItem) => void;
  onDelete: (id: string) => void;
}

const NewFeatList: React.FC<NewFeatListProps> = ({
  items,
  loading = false,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size='large' />
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <Empty
        description='No items found'
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 4,
      }}
      dataSource={items}
      renderItem={item => (
        <List.Item>
          <NewFeatCard item={item} onEdit={onEdit} onDelete={onDelete} />
        </List.Item>
      )}
    />
  );
};

export default NewFeatList;
