import { Moment } from "moment";
import React from "react";
import "./calendar-avatar.css";
import { StyledComponent } from "react-types";

interface CalendarAvatarProps extends StyledComponent {
  moment: Moment;
  borderless?: boolean;
}

const CalendarAvatar: React.FC<CalendarAvatarProps> = ({
  moment,
  borderless = false,
  ...rest
}) => (
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

export default CalendarAvatar;
