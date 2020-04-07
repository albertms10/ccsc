import React from 'react';
import { Space, Typography } from 'antd';
import IconCorDeCambra from '../../icons/IconCorDeCambra';

const { Title } = Typography;

export default ({ agrupacio }) => {
  return (
    <>
      <Space size="large">
        <IconCorDeCambra style={{ color: '#1d71b8', fontSize: '14px', width: '4rem' }} />
        <Title level={1}>{agrupacio.nom}</Title>
        <Title level={4} style={{ color: 'gray' }}>{agrupacio.descripcio}</Title>
      </Space>
    </>
  );
}
