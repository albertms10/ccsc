import { Space } from "antd";
import { Esdeveniment } from "model";
import React from "react";
import { CalendarTag } from "../../../calendar-tag";

interface CalendariFormacioCellProps {
  esdevenimentsActuals: Esdeveniment[];
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
