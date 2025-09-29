import React from 'react';
import { Modal as AntModal } from 'antd';
import { CommonModalProps } from '../../types';

const CommonModal: React.FC<CommonModalProps> = ({ 
  children, 
  visible,
  title,
  onOk,
  onCancel,
  okText = "OK",
  cancelText = "Cancel",
  width = 520,
  ...restProps 
}) => {
  return (
    <AntModal 
      visible={visible}
      title={title}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      width={width}
      {...restProps}
    >
      {children}
    </AntModal>
  );
};

export default CommonModal;