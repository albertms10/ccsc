import { Space, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

export default ({ title, subtitle, icon, style }) => {
  return (
    <Space size="large" style={{ ...style, marginBottom: '1rem' }}>
      {icon}
      <Space direction="vertical" size="0">
        <Title level={2} style={{ marginBottom: 0 }}>{title}</Title>
        <div style={{ fontSize: '1.2rem', fontWeight: 'normal' }}>{subtitle}</div>
      </Space>
    </Space>
  );
}
