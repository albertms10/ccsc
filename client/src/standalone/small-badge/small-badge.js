import { Badge } from "antd";
import React from "react";
import "./small-badge.css";

export default (props) => (
  <Badge {...props} className="small-badge" offset={[-2, "1.8rem"]} />
);
