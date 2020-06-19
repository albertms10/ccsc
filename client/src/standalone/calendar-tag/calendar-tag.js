import { Popover, Tag } from "antd";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { EsdevenimentPropTypes } from "../../typedef/prop-types";
import { CalendarEventPopover } from "../../components/calendar-event-popover";
import { StatusIcon } from "../status-icon";
import "./calendar-tag.css";

const CalendarTag = ({ childKey, esdeveniment }) => {
  const [visible, setVisible] = useState(false);

  return (
    <Popover
      visible={visible}
      content={
        <CalendarEventPopover
          hidePopover={() => setVisible(false)}
          esdeveniment={esdeveniment}
        />
      }
      trigger="click"
      onVisibleChange={setVisible}
      style={{ width: 600 }}
    >
      <Tag
        className="calendar-tag"
        key={childKey}
        style={{ opacity: moment().isAfter(esdeveniment.data_inici) ? 0.6 : 1 }}
      >
        <StatusIcon
          tooltip={esdeveniment.estat_esdeveniment}
          esAniversari={esdeveniment.tipus === "aniversari"}
          statusId={esdeveniment.id_estat_esdeveniment}
          style={{ marginRight: "0.2rem" }}
        />
        {esdeveniment.hora_inici && (
          <span className="calendar-tag-time">
            {moment(esdeveniment.hora_inici, "HH:mm:ss").format("LT")}
          </span>
        )}
        <span className="calendar-tag-title">{esdeveniment.titol}</span>
      </Tag>
    </Popover>
  );
};

CalendarTag.propTypes = {
  childKey: PropTypes.any,
  esdeveniment: EsdevenimentPropTypes.isRequired,
};

export default CalendarTag;
