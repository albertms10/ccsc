import { Space } from "antd";
import React from "react";
import { EventLineItem } from "../../standalone/event-line-item";
import { StatusIcon } from "../../standalone/status-icon";
import { EsdevenimentPropTypes } from "../../typedef/prop-types-definitions";
import { dateRange, joinElements } from "../../utils";

const EventLineItemData = ({ esdeveniment }) => (
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

EventLineItemData.propTypes = {
  esdeveniment: EsdevenimentPropTypes.isRequired,
};

export default EventLineItemData;
