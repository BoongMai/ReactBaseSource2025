import { useResponsive } from '@/shared/hooks/useResponsive';
import { useLanguageStore } from '@/shared/store/languageStore';
import { GlobalOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

const LanguageSwitcher: React.FC = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguageStore();
  const { isMobile } = useResponsive();

  const languageOptions = [
    {
      key: 'vi',
      label: (
        <Space>
          <span>🇻🇳</span>
          <Text style={{ color: '#000' }}>Tiếng Việt</Text>
        </Space>
      ),
    },
    {
      key: 'en',
      label: (
        <Space>
          <span>🇺🇸</span>
          <Text style={{ color: '#000' }}>English</Text>
        </Space>
      ),
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    setLanguage(key as 'vi' | 'en');
  };

  const currentLanguageLabel = isMobile
    ? language === 'vi'
      ? '🇻🇳'
      : '🇺🇸'
    : language === 'vi'
    ? '🇻🇳 Tiếng Việt'
    : '🇺🇸 English';

  return (
    <Dropdown
      menu={{
        items: languageOptions,
        onClick: handleMenuClick,
        selectedKeys: [language],
      }}
      trigger={['click']}
      placement="bottomRight"
    >
      <Button
        type="text"
        icon={<GlobalOutlined style={{ color: '#fff' }} />}
        size={isMobile ? 'small' : 'middle'}
        style={{
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '4px' : '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '6px',
          padding: isMobile ? '2px 6px' : '4px 8px',
          minWidth: isMobile ? 'auto' : '120px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontWeight: '500',
            fontSize: isMobile ? '12px' : '14px',
          }}
        >
          {currentLanguageLabel}
        </Text>
      </Button>
    </Dropdown>
  );
};

export default LanguageSwitcher;
