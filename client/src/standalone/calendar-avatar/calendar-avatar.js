import PropTypes from "prop-types";
import React from "react";
import "./calendar-avatar.css";

const CalendarAvatar = ({ moment, borderless = false, ...rest }) => (
  <div
    {...rest}
    className={`
      calendar-avatar
      ${borderless ? "" : "calendar-avatar-bordered"}
    `}
  >
    <div className="calendar-avatar-month">{moment.format("MMM")}</div>
    <div className="calendar-avatar-date">{moment.date()}</div>
  </div>
);

CalendarAvatar.propTypes = {
  moment: PropTypes.any.isRequired,
  borderless: PropTypes.bool,
};

export default CalendarAvatar;
