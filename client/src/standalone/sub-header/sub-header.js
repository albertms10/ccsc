import React from "react";

export default ({ title, style }) => (
  <div
    style={{
      textTransform: "uppercase",
      letterSpacing: ".1rem",
      color: "#777",
      marginTop: "1rem",
      ...style,
    }}
  >
    {title}
  </div>
);
