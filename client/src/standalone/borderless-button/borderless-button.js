import React from 'react';
import { Button, Tooltip } from 'antd';

export default (props) => (
  <Tooltip title={props.tooltip} placement={props.tooltipPlacement}>
    <Button
      {...props}
      style={{
        border: "none",
        backgroundColor: "transparent",
        boxShadow: "none",
        opacity: 0.8,
      }}
    />
  </Tooltip>
);
