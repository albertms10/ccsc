import { Badge } from 'antd';
import React from 'react';

export default (props) => (
  <Badge
    {...props}
    offset={[-2, "1.8rem"]}
    style={{
      backgroundColor: "#fff",
      color: "#999",
      boxShadow: "0 0 0 1px #d9d9d9 inset",
      padding: 0,
      fontSize: "9px",
      minWidth: "16px",
      height: "16px",
      lineHeight: "16px",
    }}
  />
);
