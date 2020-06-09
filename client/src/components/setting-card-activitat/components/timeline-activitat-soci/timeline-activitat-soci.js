import { Timeline, Typography } from "antd";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { closestTimeValue } from "../../../../utils";
import "./timeline-activitat-soci.css";

const TimelineActivitatSoci = ({ activitat }) => (
  <div className="activitat-soci">
    {activitat.dies_activitat && (
      <Typography.Paragraph>
        Període: {closestTimeValue(activitat.dies_activitat)}
      </Typography.Paragraph>
    )}
    <Timeline>
      <Timeline.Item>
        <strong>Alta: </strong>
        {moment(activitat.data_alta).format("LL")}
      </Timeline.Item>
      {activitat.data_baixa && (
        <Timeline.Item color="red">
          <strong>Baixa: </strong>
          {moment(activitat.data_baixa).format("LL")}
        </Timeline.Item>
      )}
    </Timeline>
  </div>
);

TimelineActivitatSoci.propTypes = {
  activitat: PropTypes.shape({
    data_alta: PropTypes.string.isRequired,
    data_baixa: PropTypes.string,
    dies_activitat: PropTypes.number
  }).isRequired
};

export default TimelineActivitatSoci;
