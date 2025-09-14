import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select, Space } from 'antd';
import React, { useState } from 'react';

interface NewFeatSearchProps {
  onSearch: (params: { search?: string; status?: string }) => void;
  onReset: () => void;
  loading?: boolean;
}

const NewFeatSearch: React.FC<NewFeatSearchProps> = ({
  onSearch,
  onReset,
  loading = false,
}) => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const handleSearch = () => {
    onSearch({
      search: searchText || undefined,
      status: statusFilter || undefined,
    });
  };

  const handleReset = () => {
    setSearchText('');
    setStatusFilter('');
    onReset();
  };

  return (
    <div
      style={{
        marginBottom: 16,
        padding: 16,
        background: '#f5f5f5',
        borderRadius: 6,
      }}
    >
      <Space wrap>
        <Input
          placeholder='Search by name or description'
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onPressEnter={handleSearch}
          style={{ width: 300 }}
        />

        <Select
          placeholder='Filter by status'
          value={statusFilter}
          onChange={setStatusFilter}
          style={{ width: 120 }}
          allowClear
        >
          <Select.Option value='active'>Active</Select.Option>
          <Select.Option value='inactive'>Inactive</Select.Option>
        </Select>

        <Button
          type='primary'
          icon={<SearchOutlined />}
          onClick={handleSearch}
          loading={loading}
        >
          Search
        </Button>

        <Button icon={<ReloadOutlined />} onClick={handleReset}>
          Reset
        </Button>
      </Space>
    </div>
  );
};

export default NewFeatSearch;
