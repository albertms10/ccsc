import React from 'react';
import { Button, Tooltip } from 'antd';

export default ({ icon, shape, size, tooltip, tooltipPlacement, style, children, onClick }) => (
  <Tooltip title={tooltip} placement={tooltipPlacement}>
    <Button
      icon={icon}
      shape={shape}
      size={size}
      onClick={onClick}
      style={{ ...style, border: 'none', backgroundColor: 'transparent', boxShadow: 'none', opacity: .8 }}
    >
      {children}
    </Button>
  </Tooltip>
)
