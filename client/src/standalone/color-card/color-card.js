import { Card } from "antd";
import PropTypes from "prop-types";
import React from "react";
import "./color-card.css";

const ColorCard = ({ title, description, color }) => (
  <Card className="color-card" hoverable style={{ backgroundColor: color }}>
    <div className="color-card-title">{title}</div>
    {description && <div className="color-card-description">{description}</div>}
  </Card>
);

ColorCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  color: PropTypes.string.isRequired,
};

export default ColorCard;
