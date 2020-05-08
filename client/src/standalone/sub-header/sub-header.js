import React from "react";

import "./sub-header.css";

export default ({ title, style }) => (
  <div className="sub-header" style={style}>
    {title}
  </div>
);
