import { InfoCircleOutlined, LayoutFilled } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import { Assaig, TipusEsdeveniment } from "model";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { EventLineItem } from "standalone/event-line-item";
import { StatusIcon } from "standalone/status-icon";
import { linkText } from "utils";
import { EventLineItemData } from "../event-line-item-data";
import { EventLineItemLocalitzacio } from "../event-line-item-localitzacio";
import "./calendar-event-popover.css";

interface CalendarEventPopoverProps {
  esdeveniment: TipusEsdeveniment;
}

const CalendarEventPopover: React.FC<CalendarEventPopoverProps> = ({
  esdeveniment,
}) => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="calendar-event-popover">
      <Space direction="vertical" style={{ width: "20rem" }}>
        <EventLineItem
          icon={
            esdeveniment.tipus === "aniversari" ? (
              <StatusIcon
                size="large"
                esAniversari={esdeveniment.tipus === "aniversari"}
              />
            ) : undefined
          }
          size="large"
        >
          {esdeveniment.titol}
        </EventLineItem>
        <EventLineItemData esdeveniment={esdeveniment} />
        <EventLineItemLocalitzacio esdeveniment={esdeveniment} />
        {(esdeveniment as Assaig).projectes && (
          <EventLineItem icon={<LayoutFilled />} style={{ marginTop: ".5rem" }}>
            <Space direction="vertical">
              {(esdeveniment as Assaig).projectes.map((projecte) => (
                <Space key={projecte.id_projecte}>
                  <Avatar
                    size="small"
                    shape="square"
                    style={{ backgroundColor: `#${projecte.color}` }}
                  >
                    {projecte.inicials}
                  </Avatar>
                  {projecte.titol}
                </Space>
              ))}
            </Space>
          </EventLineItem>
        )}
        {esdeveniment.tipus === "assaig" && (
          <EventLineItem icon={<InfoCircleOutlined />}>
            <Link
              to={`/${linkText(t("rehearsals"))}/${
                esdeveniment.id_esdeveniment
              }`}
            >
              {t("common:more details")}
            </Link>
          </EventLineItem>
        )}
      </Space>
    </div>
  );
};

export default CalendarEventPopover;
