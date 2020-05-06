import React from "react";

export default ({ children, style }) => (
  <div style={{ ...style, margin: 32 }}>{children}</div>
);
