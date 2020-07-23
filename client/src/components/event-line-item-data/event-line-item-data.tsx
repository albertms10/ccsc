import { Space } from "antd";
import { Esdeveniment } from "model";
import React from "react";
import { EventLineItem } from "../../standalone/event-line-item";
import { StatusIcon } from "../../standalone/status-icon";
import { dateRange, joinElements } from "../../utils";

interface EventLineItemDataProps {
  esdeveniment: Esdeveniment;
}

const EventLineItemData: React.FC<EventLineItemDataProps> = ({
  esdeveniment,
}) => (
  <EventLineItem>
    <Space>
      <div>
        {joinElements(
          dateRange(
            esdeveniment.dia_inici,
            esdeveniment.hora_inici,
            esdeveniment.dia_final,
            esdeveniment.hora_final
          ),
          (item, index) => (
            <span key={index}>{item}</span>
          ),
          (key) => (
            <span key={key} style={{ padding: "0 .25rem" }}>
              ·
            </span>
          )
        )}
      </div>
      {esdeveniment.tipus !== "aniversari" && (
        <StatusIcon
          tooltip={esdeveniment.estat_esdeveniment}
          statusId={esdeveniment.id_estat_esdeveniment}
        />
      )}
    </Space>
  </EventLineItem>
);

export default EventLineItemData;
