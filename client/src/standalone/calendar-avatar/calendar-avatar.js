import PropTypes from "prop-types";
import React from "react";
import "./calendar-avatar.css";

const CalendarAvatar = ({ moment, borderless }) => (
  <div
    className={`
      calendar-badge
      ${borderless ? "" : "calendar-badge-bordered"}
  `}
  >
    <div className="calendar-badge-month">{moment.format("MMM")}</div>
    <div className="calendar-badge-date">{moment.date()}</div>
  </div>
);

CalendarAvatar.propTypes = {
  moment: PropTypes.any.isRequired,
  borderless: PropTypes.bool,
};

CalendarAvatar.defaultProps = {
  borderless: false,
};

export default CalendarAvatar;
