import { useResponsive } from '@/shared/hooks/useResponsive';
import { Popover as AntPopover, PopoverProps as AntPopoverProps } from 'antd';
import React from 'react';

interface PopupProps extends Omit<AntPopoverProps, 'content'> {
  children: React.ReactNode;
  content: React.ReactNode;
  title?: string;
  description?: string;
  showArrow?: boolean;
  placement?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom';
  trigger?: 'hover' | 'focus' | 'click' | 'contextMenu';
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  destroyTooltipOnHide?: boolean;
}

const Popup: React.FC<PopupProps> = ({
  children,
  content,
  title,
  description,
  showArrow = true,
  placement = 'bottom',
  trigger = 'hover',
  overlayClassName,
  overlayStyle,
  destroyTooltipOnHide = true,
  ...props
}) => {
  const { isMobile } = useResponsive();

  const popupContent = (
    <div style={{ maxWidth: isMobile ? '280px' : '320px' }}>
      {title && (
        <div
          style={{
            fontWeight: 'bold',
            fontSize: isMobile ? '14px' : '16px',
            marginBottom: description ? '8px' : '0',
            color: 'var(--color-text)',
          }}
        >
          {title}
        </div>
      )}
      {description && (
        <div
          style={{
            fontSize: isMobile ? '12px' : '14px',
            color: 'var(--color-text-secondary)',
            marginBottom: '8px',
          }}
        >
          {description}
        </div>
      )}
      <div style={{ fontSize: isMobile ? '13px' : '14px' }}>{content}</div>
    </div>
  );

  return (
    <AntPopover
      {...props}
      content={popupContent}
      title={undefined} // We handle title in content
      placement={placement}
      trigger={trigger}
      showArrow={showArrow}
      overlayClassName={overlayClassName}
      overlayStyle={{
        maxWidth: isMobile ? '280px' : '320px',
        ...overlayStyle,
      }}
      destroyTooltipOnHide={destroyTooltipOnHide}
      styles={{
        body: {
          padding: isMobile ? '8px' : '12px',
        },
        ...props.styles,
      }}
    >
      {children}
    </AntPopover>
  );
};

export default Popup;
