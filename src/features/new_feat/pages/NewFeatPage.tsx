import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Space,
  Table,
  Upload,
} from 'antd';
import imageCompression from 'browser-image-compression';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Papa from 'papaparse';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import {
  useCreateNewFeat,
  useDeleteNewFeat,
  useNewFeatList,
  useUpdateNewFeat,
} from '../hooks';
import { CreateNewFeatData, NewFeatItem } from '../services/newFeat.api';
import styles from '../styles/newFeat.module.scss';

const NewFeatPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewFeatItem | null>(null);
  const [form] = Form.useForm();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Queries
  const { data: items, isFetching, refetch } = useNewFeatList();
  const createMutation = useCreateNewFeat();
  const updateMutation = useUpdateNewFeat();
  const deleteMutation = useDeleteNewFeat();

  // Table columns
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      ellipsis: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status: string) => (
        <span style={{ color: status === 'active' ? 'green' : 'red' }}>
          {status.toUpperCase()}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      fixed: 'right' as const,
      render: (_: any, record: NewFeatItem) => (
        <Space size='small'>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size='small'
          >
            Edit
          </Button>
          <Popconfirm
            title='Are you sure to delete this item?'
            onConfirm={() => handleDelete(record.id)}
            okText='Yes'
            cancelText='No'
          >
            <Button icon={<DeleteOutlined />} danger size='small'>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Export/Import handlers
  const handleExportExcel = () => {
    const data = items?.data || [];
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'NewFeat Data');
    XLSX.writeFile(wb, 'newfeat-data.xlsx');
    message.success('Excel file exported successfully!');
  };

  const handleExportCSV = () => {
    const data = items?.data || [];
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'newfeat-data.csv';
    link.click();
    message.success('CSV file exported successfully!');
  };

  const handleExportPDF = () => {
    const data = items?.data || [];
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(16);
    doc.text('New Feature Data Report', 14, 22);

    // Add table
    (doc as any).autoTable({
      head: [['Name', 'Description', 'Status', 'Created At']],
      body: data.map(item => [
        item.name,
        item.description,
        item.status,
        new Date(item.createdAt).toLocaleDateString(),
      ]),
      startY: 30,
    });

    doc.save('newfeat-report.pdf');
    message.success('PDF report exported successfully!');
  };

  const handleFileUpload = async (file: File) => {
    try {
      // Compress image if it's an image file
      if (file.type.startsWith('image/')) {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
        });
        setUploadedFiles(prev => [...prev, compressedFile]);
        message.success('Image compressed and uploaded!');
      } else {
        setUploadedFiles(prev => [...prev, file]);
        message.success('File uploaded successfully!');
      }
    } catch (error) {
      message.error('Failed to upload file');
    }
    return false; // Prevent default upload
  };

  const handleImportCSV = (file: File) => {
    Papa.parse(file, {
      header: true,
      complete: results => {
        console.log('Imported data:', results.data);
        message.success(`Imported ${results.data.length} records from CSV`);
      },
      error: error => {
        message.error('Failed to import CSV file');
        console.error('CSV import error:', error);
      },
    });
    return false;
  };

  // Handlers
  const handleCreate = () => {
    setEditingItem(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (item: NewFeatItem) => {
    setEditingItem(item);
    form.setFieldsValue(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      message.success('Item deleted successfully');
    } catch (error) {
      message.error('Failed to delete item');
    }
  };

  const handleSubmit = async (values: CreateNewFeatData) => {
    try {
      if (editingItem) {
        await updateMutation.mutateAsync({ id: editingItem.id, data: values });
        message.success('Item updated successfully');
      } else {
        await createMutation.mutateAsync(values);
        message.success('Item created successfully');
      }
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error('Operation failed');
    }
  };

  return (
    <div className={styles.container}>
      <Card title='New Feature Management'>
        {/* Action Buttons */}
        <div
          style={{
            marginBottom: 16,
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
          }}
        >
          <Button type='primary' icon={<PlusOutlined />} onClick={handleCreate}>
            Add New Item
          </Button>

          {/* Export Buttons */}
          <Button icon={<FileExcelOutlined />} onClick={handleExportExcel}>
            Export Excel
          </Button>
          <Button icon={<DownloadOutlined />} onClick={handleExportCSV}>
            Export CSV
          </Button>
          <Button icon={<FilePdfOutlined />} onClick={handleExportPDF}>
            Export PDF
          </Button>
        </div>

        {/* File Upload Section */}
        <Card
          size='small'
          title='File Upload Demo'
          style={{ marginBottom: 16 }}
        >
          <Space direction='vertical' style={{ width: '100%' }}>
            <Upload
              beforeUpload={handleFileUpload}
              showUploadList={false}
              accept='image/*,.csv'
            >
              <Button icon={<UploadOutlined />}>Upload Image/CSV</Button>
            </Upload>

            <Upload
              beforeUpload={handleImportCSV}
              showUploadList={false}
              accept='.csv'
            >
              <Button icon={<DownloadOutlined />}>Import CSV Data</Button>
            </Upload>

            {uploadedFiles.length > 0 && (
              <div>
                <p>Uploaded Files ({uploadedFiles.length}):</p>
                {uploadedFiles.map((file, index) => (
                  <div key={index} style={{ fontSize: '12px', color: '#666' }}>
                    📄 {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </div>
                ))}
              </div>
            )}
          </Space>
        </Card>

        <Table
          columns={columns}
          dataSource={items?.data || []}
          loading={isFetching}
          rowKey='id'
          scroll={{ x: 'max-content' }}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            showQuickJumper: false,
            simple: true,
          }}
          size='small'
        />

        <Modal
          title={editingItem ? 'Edit Item' : 'Create New Item'}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Form form={form} layout='vertical' onFinish={handleSubmit}>
            <Form.Item
              name='name'
              label='Name'
              rules={[{ required: true, message: 'Please input name!' }]}
            >
              <Input placeholder='Enter name' />
            </Form.Item>

            <Form.Item
              name='description'
              label='Description'
              rules={[{ required: true, message: 'Please input description!' }]}
            >
              <Input.TextArea placeholder='Enter description' rows={4} />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button
                  type='primary'
                  htmlType='submit'
                  loading={createMutation.isPending || updateMutation.isPending}
                >
                  {editingItem ? 'Update' : 'Create'}
                </Button>
                <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default NewFeatPage;
