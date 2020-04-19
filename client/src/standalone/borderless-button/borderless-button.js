import React from "react";
import { Button, Tooltip } from "antd";

export default ({ tooltip, tooltipPlacement, ...rest }) => (
  <Tooltip title={tooltip} placement={tooltipPlacement}>
    <Button
      {...rest}
      style={{
        border: "none",
        backgroundColor: "transparent",
        boxShadow: "none",
        opacity: 0.8,
      }}
    />
  </Tooltip>
);
