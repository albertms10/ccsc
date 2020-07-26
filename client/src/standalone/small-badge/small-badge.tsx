import { Badge } from "antd";
import { BadgeProps } from "antd/lib/badge";
import React from "react";

interface SmallBadgeProps extends BadgeProps {}

const SmallBadge: React.FC<SmallBadgeProps> = (props) => (
  <Badge
    {...props}
    offset={[-2, "1.8rem"]}
    style={{
      backgroundColor: "#fff",
      color: "#999",
      boxShadow: "0 0 0 1px #d9d9d9 inset",
      padding: 0,
      fontSize: 9,
      minWidth: 16,
      height: 16,
      lineHeight: 16,
    }}
  />
);

export default SmallBadge;
