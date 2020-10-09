import { Dayjs } from "dayjs";
import React from "react";
import "./calendar-avatar.css";
import { StyledComponent } from "react-types";

interface CalendarAvatarProps extends StyledComponent {
  dayjs: Dayjs;
  borderless?: boolean;
}

const CalendarAvatar: React.FC<CalendarAvatarProps> = ({
  dayjs,
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
    <div className="calendar-avatar-month">{dayjs.format("MMM")}</div>
    <div className="calendar-avatar-date">{dayjs.date()}</div>
  </div>
);

export default CalendarAvatar;
