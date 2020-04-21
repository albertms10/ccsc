import React from "react";

import "./calendar-avatar.css";

export default ({ moment, noBorder }) => (
  <div
    className={`
      calendar-badge
      ${noBorder ? "" : "calendar-badge-bordered"}
  `}
  >
    <div className="calendar-badge-month">{moment.format("MMM")}</div>
    <div className="calendar-badge-date">{moment.date()}</div>
  </div>
);
