import React from "react";
import { StyledComponent } from "react-types";

type SafeMarginProps = StyledComponent;

const SafeMargin: React.FC<SafeMarginProps> = ({ children, style }) => (
  <div style={{ margin: 32, ...style }}>{children}</div>
);

export default SafeMargin;
