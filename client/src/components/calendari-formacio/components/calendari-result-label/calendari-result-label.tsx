import { Space } from "antd";
import { Esdeveniment } from "model";
import dayjs from "dayjs";
import React from "react";
import { CalendarAvatar } from "standalone/calendar-avatar";
import { StatusIcon } from "standalone/status-icon";

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
      <CalendarAvatar dayjs={dayjs(esdeveniment.data)} borderless />
      <span>{esdeveniment.titol}</span>
    </Space>
    <Space>
      <span className="search-complete-item-extra">
        {esdeveniment.hora_inici
          ? dayjs(esdeveniment.datahora_inici).format("LT")
          : ""}
      </span>
    </Space>
  </div>
);

export default CalendariResultLabel;
