import PropTypes from "prop-types";
import React from "react";
import "./event-line-item.css";

const SIZES = ["middle", "large"];

const EventLineItem = ({ icon, size = SIZES[0], style, children }) => (
  <div className="event-line-item" style={style}>
    <div className="event-line-item-icon">{icon}</div>
    <div className={`event-line-item-text ${size}`}>{children}</div>
  </div>
);

EventLineItem.propTypes = {
  icon: PropTypes.node,
  size: PropTypes.oneOf(SIZES),
  children: PropTypes.node.isRequired,
};

export default EventLineItem;
