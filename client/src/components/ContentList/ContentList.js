import React from 'react';
import { Button, Col, List, Row, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default ({ title, loading, data, style }) => {
  return (
    <div style={style}>
      <Row>
        <Col span={20}>
          <Title level={4}>{title}</Title>
        </Col>
        <Col span={4} style={{ textAlign: 'right' }}>
          <Button shape="circle" icon={<PlusOutlined />} />
        </Col>
      </Row>
      <List
        bordered
        loading={loading}
        dataSource={data}
        renderItem={({ title, avatar, extra }) => (
          <List.Item>
            <List.Item.Meta avatar={avatar} title={title} />
            <div style={{ fontSize: 'smaller', color: 'gray' }}>{extra}</div>
          </List.Item>
        )}
        style={{ backgroundColor: '#fff' }}
      />
    </div>
  );
}
