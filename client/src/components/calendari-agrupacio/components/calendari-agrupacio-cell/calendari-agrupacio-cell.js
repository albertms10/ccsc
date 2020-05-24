import { Space } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { CalendarTag } from "../../../../standalone/calendar-tag";
import { EsdevenimentPropTypes } from "../../../../typedef/prop-types";

const CalendariAgrupacioCell = ({ esdevenimentsActuals }) => (
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

CalendariAgrupacioCell.propTypes = {
  esdevenimentsActuals: PropTypes.arrayOf(EsdevenimentPropTypes).isRequired,
};

export default CalendariAgrupacioCell;
