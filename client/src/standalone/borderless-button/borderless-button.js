import { Button, Tooltip } from "antd";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";

const BorderlessButton = forwardRef(({ tooltip, tooltipPlacement, ...rest }, ref) => {
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

const TOOLTIP_PLACEMENT = [
  "top",
  "left",
  "right",
  "bottom",
  "topLeft",
  "topRight",
  "bottomLeft",
  "bottomRight",
  "leftTop",
  "leftBottom",
  "rightTop",
  "rightBottom",
];

BorderlessButton.propTypes = {
  tooltip: PropTypes.string,
  tooltipPlacement: PropTypes.oneOf(TOOLTIP_PLACEMENT),
};

export default BorderlessButton;
