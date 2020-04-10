import React from 'react';
import { Badge, Tag } from 'antd';

export default ({ key, statusId, time, text }) => (
  <Tag>
    <Badge
      key={key}
      status={['success', 'processing', 'error', 'warning'][statusId]}
    />
    <span>{time}</span>
    <b>{text}</b>
  </Tag>
)
