import { Button, Tooltip } from "antd";
import React from "react";

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
