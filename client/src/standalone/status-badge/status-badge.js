import { Badge, Tooltip } from 'antd';
import React from 'react';

export default ({ tooltip, statusId, style }) => (
  <Tooltip title={tooltip}>
    <Badge status={['success', 'processing', 'error', 'warning'][statusId - 1]} style={style} />
  </Tooltip>
)
