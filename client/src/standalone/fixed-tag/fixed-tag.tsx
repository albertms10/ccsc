import { Tag, Tooltip } from "antd";
import React from "react";

interface FixedTagProps {
  childKey: any;
  tooltip: string;
  color: string;
  style?: React.CSSProperties;
}

const FixedTag: React.FC<FixedTagProps> = ({
  childKey,
  tooltip,
  color,
  style,
  children,
}) => (
  <Tooltip key={childKey} title={tooltip}>
    <Tag
      color={color}
      style={{ ...style, width: "1.41rem", textAlign: "center", padding: 0 }}
    >
      {children}
    </Tag>
  </Tooltip>
);

export default FixedTag;
