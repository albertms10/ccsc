import { Timeline, Typography } from "antd";
import { Activitat } from "model";
import moment from "moment";
import React from "react";
import { closestTimeValue } from "../../../../utils";
import "./timeline-activitat-soci.css";

interface TimelineActivitatSociProps {
  activitat: Activitat;
}

const TimelineActivitatSoci: React.FC<TimelineActivitatSociProps> = ({
  activitat,
}) => (
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

export default TimelineActivitatSoci;
