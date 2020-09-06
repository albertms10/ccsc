import { Space } from "antd";
import { Esdeveniment } from "model";
import React from "react";
import { useTranslation } from "react-i18next";
import { EventLineItem } from "standalone/event-line-item";
import { StatusIcon } from "standalone/status-icon";
import { dateRange } from "utils/datetime";
import { joinElements } from "utils/lists";

interface EventLineItemDataProps {
  esdeveniment: Esdeveniment;
}

const EventLineItemData: React.FC<EventLineItemDataProps> = ({
  esdeveniment,
}) => {
  const { t } = useTranslation();

  return (
    <EventLineItem>
      <Space>
        <div>
          {joinElements(
            dateRange(
              esdeveniment.data,
              esdeveniment.hora_inici,
              esdeveniment.data,
              esdeveniment.hora_final,
              { separator: t("of connector") }
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
};

export default EventLineItemData;
