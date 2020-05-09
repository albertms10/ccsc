import { Button, Tooltip } from "antd";
import React, { forwardRef } from "react";

export default forwardRef(({ tooltip, tooltipPlacement, ...rest }, ref) => {
  return (
    <Tooltip title={tooltip} placement={tooltipPlacement}>
      <Button
        {...rest}
        ref={ref}
        style={{
          border: "none",
          backgroundColor: "transparent",
          boxShadow: "none",
          opacity: 0.8,
        }}
      />
    </Tooltip>
  );
});
