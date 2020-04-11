import React from 'react';
import { Badge, Tag } from 'antd';

export default ({ childKey, statusId, time, text }) => (
  <Tag key={childKey}>
    <Badge status={['success', 'processing', 'error', 'warning'][statusId]} />
    <span>{time}</span>
    <b>{text}</b>
  </Tag>
)
