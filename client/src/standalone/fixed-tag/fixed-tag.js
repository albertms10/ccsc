import { Tag, Tooltip } from "antd";
import PropTypes from "prop-types";
import React from "react";

const FixedTag = ({ childKey, tooltip, color, style, children }) => (
  <Tooltip key={childKey} title={tooltip}>
    <Tag
      color={color}
      style={{ ...style, width: "1.41rem", textAlign: "center", padding: 0 }}
    >
      {children}
    </Tag>
  </Tooltip>
);

FixedTag.propTypes = {
  childKey: PropTypes.any,
  tooltip: PropTypes.string,
  color: PropTypes.string,
};

export default FixedTag;
