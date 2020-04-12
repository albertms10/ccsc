import React from 'react';
import { Tag, Tooltip } from 'antd';

export default ({ childKey, tooltip, color, style, children }) => (
  <Tooltip key={childKey} title={tooltip}>
    <Tag color={color} style={{ ...style, width: '1.41rem', textAlign: 'center', padding: 0 }}>
      {children}
    </Tag>
  </Tooltip>
)
