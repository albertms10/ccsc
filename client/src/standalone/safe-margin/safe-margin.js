import React from "react";

export default ({ children, style }) => (
  <div style={{ margin: 32, ...style }}>{children}</div>
);
