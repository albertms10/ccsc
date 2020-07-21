import { Button, Tooltip } from "antd";
import { ButtonProps } from "antd/lib/button";
import { TooltipPlacement } from "antd/lib/tooltip";
import React, { forwardRef } from "react";

interface BorderlessButtonProps extends ButtonProps {
  tooltip: string;
  tooltipPlacement: TooltipPlacement;
  style?: React.CSSProperties;
}

const BorderlessButton = forwardRef<HTMLButtonElement, BorderlessButtonProps>(
  ({ tooltip, tooltipPlacement, style, ...rest }, ref) => (
    <Tooltip title={tooltip} placement={tooltipPlacement}>
      <Button
        {...rest}
        ref={ref}
        style={{
          border: "none",
          backgroundColor: "transparent",
          boxShadow: "none",
          opacity: 0.8,
          ...style,
        }}
      />
    </Tooltip>
  )
);

export default BorderlessButton;
