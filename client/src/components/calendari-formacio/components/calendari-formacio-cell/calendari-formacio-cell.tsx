import { Space } from "antd";
import { CalendarTag } from "components/calendar-tag";
import { TipusEsdeveniment } from "model";
import React from "react";

interface CalendariFormacioCellProps {
  esdevenimentsActuals: TipusEsdeveniment[];
}

const CalendariFormacioCell: React.FC<CalendariFormacioCellProps> = ({
  esdevenimentsActuals,
}) => (
  <Space size={-5} direction="vertical">
    {esdevenimentsActuals.map((esdeveniment) => (
      <CalendarTag
        key={esdeveniment.id_esdeveniment}
        childKey={esdeveniment.id_esdeveniment}
        esdeveniment={esdeveniment}
      />
    ))}
  </Space>
);

export default CalendariFormacioCell;
