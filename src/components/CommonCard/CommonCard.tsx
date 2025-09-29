import React from 'react';
import { Card as AntCard } from 'antd';
import { CommonCardProps } from '../../types';

const CommonCard: React.FC<CommonCardProps> = ({ 
  children, 
  hoverable = false,
  bordered = true,
  shadow = 'hover',
  ...restProps 
}) => {
  const getShadowStyle = () => {
    switch (shadow) {
      case 'always':
        return { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' };
      case 'hover':
        return hoverable ? {} : { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' };
      case 'never':
      default:
        return {};
    }
  };

  return (
    <AntCard 
      hoverable={hoverable}
      bordered={bordered}
      style={{
        ...getShadowStyle(),
        ...restProps.style
      }}
      {...restProps}
    >
      {children}
    </AntCard>
  );
};

export default CommonCard;