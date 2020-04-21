import { Card } from "antd";
import React from "react";

import "./color-card.css";

export default ({ title, description, color }) => (
  <Card className="color-card" hoverable style={{ backgroundColor: color }}>
    <div className="color-card-title">{title}</div>
    {description ? (
      <div className="color-card-description">{description}</div>
    ) : (
      ""
    )}
  </Card>
);
