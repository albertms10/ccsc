import { EditFilled, EnvironmentFilled, LayoutFilled } from "@ant-design/icons";
import { Avatar, Col, Row, Space } from "antd";
import React from "react";
import { joinComponents } from "../../helpers";
import { EsdevenimentPropTypes } from "../../typedef/prop-types";
import { dateRange, upperCaseFirst } from "../../utils";
import { BorderlessButton } from "../borderless-button";
import { StatusIcon } from "../status-icon";
import "./calendar-event-popover.css";
import { EventLineItem } from "./event-line-item";

const CalendarEventPopover = ({ esdeveniment }) => (
  <div className="calendar-event-popover">
    <Space direction="vertical" style={{ width: "20rem" }}>
      <Row>
        <Col span={18}>
          <EventLineItem
            icon={
              esdeveniment.tipus === "aniversari" && (
                <StatusIcon
                  size="large"
                  esAniversari={esdeveniment.tipus === "aniversari"}
                />
              )
            }
            size="large"
          >
            {esdeveniment.titol}
          </EventLineItem>
        </Col>
        <Col span={6} style={{ textAlign: "end" }}>
          <BorderlessButton size="small" icon={<EditFilled />}>
            Edita
          </BorderlessButton>
        </Col>
      </Row>
      <EventLineItem>
        <Space>
          <div>
            {joinComponents(
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
      {esdeveniment.localitzacio && (
        <EventLineItem
          icon={<EnvironmentFilled />}
          style={{ marginTop: ".5rem" }}
        >
          <div>
            {esdeveniment.establiment && <div>{esdeveniment.establiment}</div>}
            <div
              className={
                esdeveniment.establiment
                  ? "calendar-event-popover--item-light"
                  : ""
              }
            >
              {upperCaseFirst(esdeveniment.localitzacio)}
            </div>
          </div>
        </EventLineItem>
      )}
      {esdeveniment.localitzacio && (
        <EventLineItem icon={<LayoutFilled />} style={{ marginTop: ".5rem" }}>
          <Space direction="vertical">
            {esdeveniment.projectes.map((projecte) => (
              <Space key={projecte.id_projecte}>
                <Avatar
                  size="small"
                  shape="square"
                  style={{ backgroundColor: "#" + projecte.color }}
                >
                  {projecte.inicials}
                </Avatar>
                {projecte.titol}
              </Space>
            ))}
          </Space>
        </EventLineItem>
      )}
    </Space>
  </div>
);

CalendarEventPopover.propTypes = {
  esdeveniment: EsdevenimentPropTypes.isRequired
};

export default CalendarEventPopover;
