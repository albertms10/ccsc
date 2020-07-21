import React from "react";
import "./event-line-item.css";

interface EventLineItemProps {
  icon?: JSX.Element;
  size?: "middle" | "large";
  style?: React.CSSProperties;
}

const EventLineItem: React.FC<EventLineItemProps> = ({
  icon,
  size = "middle",
  style,
  children,
}) => (
  <div className="event-line-item" style={style}>
    <div className="event-line-item-icon">{icon}</div>
    <div className={`event-line-item-text ${size}`}>{children}</div>
  </div>
);

export default EventLineItem;
