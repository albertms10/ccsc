import { Card } from "antd";
import React from "react";
import "./color-card.css";

interface ColorCardProps {
  title?: string;
  description?: string;
  color: string;
  hoverable?: boolean;
}

const ColorCard: React.FC<ColorCardProps> = ({
  title,
  description,
  color,
  hoverable = true,
}) => (
  <Card
    className="color-card"
    hoverable={hoverable}
    style={{ backgroundColor: color }}
  >
    <div className="color-card-title">{title}</div>
    {description && <div className="color-card-description">{description}</div>}
  </Card>
);

export default ColorCard;
