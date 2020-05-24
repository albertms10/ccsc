import PropTypes from "prop-types";
import React from "react";
import "./event-line-item.css";

const EventLineItem = ({ icon, size, style, children }) => (
  <div className="event-line-item" style={style}>
    <div className="event-line-item-icon">{icon}</div>
    <div className={`event-line-item-text ${size}`}>{children}</div>
  </div>
);

const SIZES = ["middle", "large"];

EventLineItem.propTypes = {
  icon: PropTypes.node,
  size: PropTypes.oneOf(SIZES),
  children: PropTypes.node.isRequired,
};

EventLineItem.defaultProps = {
  size: SIZES[0],
};

export default EventLineItem;
