import { getErrorMessage } from '@/shared/utils/helpers/errorHandler';
import { Button, Space, Table, TableProps, Tag, Tooltip, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useMemo } from 'react';

const { Text } = Typography;

// Column configuration interface
export interface ColumnConfig {
  key: string;
  title: string;
  dataIndex?: string;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  filterable?: boolean;
  fixed?: 'left' | 'right';
  render?: (value: any, record: any, index: number) => React.ReactNode;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'tag' | 'action' | 'custom';
  tagColor?: string | ((value: any) => string);
  dateFormat?: string;
  ellipsis?: boolean;
  tooltip?: boolean;
  copyable?: boolean;
  link?: (value: any, record: any) => string;
  actions?: ActionConfig[];
}

// Action configuration for action columns
export interface ActionConfig {
  key: string;
  label: string;
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  danger?: boolean;
  disabled?: (record: any) => boolean;
  onClick: (record: any, index: number) => void;
  icon?: React.ReactNode;
  tooltip?: string;
}

// DataTable props
export interface DataTableProps<T = any>
  extends Omit<TableProps<T>, 'columns' | 'dataSource' | 'pagination'> {
  data?: T[];
  columns: ColumnConfig[];
  loading?: boolean;
  error?: any;
  emptyText?: string;
  showHeader?: boolean;
  size?: 'small' | 'middle' | 'large';
  bordered?: boolean;
  pagination?: boolean | TableProps<T>['pagination'];
  rowKey?: string | ((record: T) => string);
  onRow?: (record: T, index?: number) => any;
  onChange?: (pagination: any, filters: any, sorter: any) => void;
  className?: string;
  style?: React.CSSProperties;
}

// Default renderers for different column types
const defaultRenderers = {
  text: (value: any) => <Text>{value || '-'}</Text>,
  number: (value: any) => <Text>{value ? Number(value).toLocaleString() : '-'}</Text>,
  date: (value: any, format: string = 'DD/MM/YYYY HH:mm') => {
    if (!value) return <Text>-</Text>;
    const date = new Date(value);
    return (
      <Text>
        {date.toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    );
  },
  boolean: (value: any) => <Tag color={value ? 'green' : 'red'}>{value ? 'Có' : 'Không'}</Tag>,
  tag: (value: any, color?: string | ((value: any) => string)) => {
    const tagColor = typeof color === 'function' ? color(value) : color || 'blue';
    return <Tag color={tagColor}>{value || '-'}</Tag>;
  },
  action: (value: any, record: any, index: number, actions?: ActionConfig[]) => {
    if (!actions || actions.length === 0) return null;

    return (
      <Space size="small">
        {actions.map((action) => {
          const isDisabled = action.disabled ? action.disabled(record) : false;

          return (
            <Tooltip key={action.key} title={action.tooltip}>
              <Button
                type={action.type || 'link'}
                size="small"
                danger={action.danger}
                disabled={isDisabled}
                icon={action.icon}
                onClick={() => action.onClick(record, index)}
              >
                {action.label}
              </Button>
            </Tooltip>
          );
        })}
      </Space>
    );
  },
};

// Main DataTable component
const DataTable = <T extends Record<string, any>>({
  data = [],
  columns,
  loading = false,
  error,
  emptyText = 'Không có dữ liệu',
  showHeader = true,
  size = 'middle',
  bordered = false,
  pagination = true,
  rowKey = 'id',
  onRow,
  onChange,
  className,
  style,
  ...tableProps
}: DataTableProps<T>) => {
  // Convert column configs to Ant Design columns
  const antdColumns: ColumnsType<T> = useMemo(() => {
    return columns.map((col) => {
      const column: ColumnsType<T>[0] = {
        key: col.key,
        title: col.title,
        dataIndex: col.dataIndex || col.key,
        width: col.width,
        align: col.align || 'left',
        fixed: col.fixed,
        sorter: col.sortable,
        ellipsis: col.ellipsis,
        render: (value: any, record: T, index: number) => {
          // Custom render function takes priority
          if (col.render) {
            return col.render(value, record, index);
          }

          // Default renderers based on type
          switch (col.type) {
            case 'text':
              return col.tooltip ? (
                <Tooltip title={value}>
                  <Text ellipsis={col.ellipsis} copyable={col.copyable}>
                    {defaultRenderers.text(value)}
                  </Text>
                </Tooltip>
              ) : (
                <Text ellipsis={col.ellipsis} copyable={col.copyable}>
                  {defaultRenderers.text(value)}
                </Text>
              );

            case 'number':
              return defaultRenderers.number(value);

            case 'date':
              return defaultRenderers.date(value, col.dateFormat);

            case 'boolean':
              return defaultRenderers.boolean(value);

            case 'tag':
              return defaultRenderers.tag(value, col.tagColor);

            case 'action':
              return defaultRenderers.action(value, record, index, col.actions);

            case 'custom':
              return value;

            default:
              return col.tooltip ? (
                <Tooltip title={value}>
                  <Text ellipsis={col.ellipsis} copyable={col.copyable}>
                    {value || '-'}
                  </Text>
                </Tooltip>
              ) : (
                <Text ellipsis={col.ellipsis} copyable={col.copyable}>
                  {value || '-'}
                </Text>
              );
          }
        },
      };

      return column;
    });
  }, [columns]);

  // Handle error state
  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Text type="danger">Lỗi: {getErrorMessage(error)}</Text>
      </div>
    );
  }

  return (
    <div style={{ overflow: 'auto' }}>
      <Table<T>
        {...tableProps}
        columns={antdColumns}
        dataSource={data}
        loading={loading}
        showHeader={showHeader}
        size={size}
        bordered={bordered}
        pagination={pagination === true ? undefined : pagination}
        rowKey={rowKey}
        onRow={onRow}
        className={className}
        style={style}
        locale={{
          emptyText: emptyText,
        }}
      />
    </div>
  );
};

export default DataTable;
