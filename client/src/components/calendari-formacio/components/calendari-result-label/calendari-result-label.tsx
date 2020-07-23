import { Space } from "antd";
import { Esdeveniment } from "model";
import moment from "moment";
import React from "react";
import { CalendarAvatar } from "../../../../standalone/calendar-avatar";
import { StatusIcon } from "../../../../standalone/status-icon";

interface CalendariResultLabelProps {
  esdeveniment: Esdeveniment;
}

const CalendariResultLabel: React.FC<CalendariResultLabelProps> = ({
  esdeveniment,
}) => (
  <div className="search-complete-item">
    <Space>
      <StatusIcon
        tooltip={esdeveniment.estat_esdeveniment}
        statusId={esdeveniment.id_estat_esdeveniment}
        esAniversari={esdeveniment.tipus === "aniversari"}
      />
      <CalendarAvatar moment={moment(esdeveniment.dia_inici)} borderless />
      <span>{esdeveniment.titol}</span>
    </Space>
    <Space>
      <span className="search-complete-item-extra">
        {esdeveniment.hora_inici
          ? moment(esdeveniment.data_inici).format("LT")
          : ""}
      </span>
    </Space>
  </div>
);

export default CalendariResultLabel;
