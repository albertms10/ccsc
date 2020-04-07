import { Space, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

export default ({ title, subtitle, icon }) => {
  return (
    <Space size="large" style={{ marginBottom: '3rem' }}>
      {icon}
      <Space direction="vertical" size="0">
        <Title level={2} style={{ marginBottom: 0 }}>{title}</Title>
        <Title level={4} style={{ marginBottom: 0, color: 'gray' }}>{subtitle}</Title>
      </Space>
    </Space>
  );
}
