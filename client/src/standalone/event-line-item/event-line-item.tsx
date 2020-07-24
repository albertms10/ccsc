import React from "react";
import "./event-line-item.css";
import { StyledComponent } from "react-types";

interface EventLineItemProps extends StyledComponent {
  icon?: React.ReactNode;
  size?: "middle" | "large";
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
