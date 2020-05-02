import React from "react";

import "./event-line-item.css";

/**
 *
 * @param {React.Component} icon
 * @param {*} content
 * @param {('middle'|'large')} [size="middle"]
 * @param {Object} style
 * @returns {*}
 */
export default ({ icon, content, size = "middle", style }) => (
  <div className="event-line-item" style={style}>
    <div className="event-line-item-icon">{icon}</div>
    <div className={`event-line-item-text ${size}`}>{content}</div>
  </div>
);
