import React from "react";
import moment from "moment";
import { Avatar, Col, Row, Space } from "antd";
import { EditFilled, EnvironmentFilled, LayoutFilled } from "@ant-design/icons";
import { BorderlessButton } from "../borderless-button";
import { StatusBadge } from "../status-badge";

import "./calendar-event-popover.css";
import { upperCaseFirst } from "../../utils";
import { EventLineItem } from "./event-line-item";

export default ({ event }) => (
  <div className="calendar-event-popover">
    <Space direction="vertical" style={{ width: "20rem" }}>
      <Row>
        <Col span={18}>
          <EventLineItem
            icon={
              event.tipus === "aniversari" ? (
                <StatusBadge
                  size="large"
                  esAniversari={event.tipus === "aniversari"}
                />
              ) : null
            }
            content={event.titol}
            size="large"
          />
        </Col>
        <Col span={6} style={{ textAlign: "end" }}>
          <BorderlessButton size="small" icon={<EditFilled />}>
            Edita
          </BorderlessButton>
        </Col>
      </Row>
      <EventLineItem
        content={
          <Space>
            <div>
              {moment(event.dia_inici).format("dddd, LL")}
              {event.hora_inici ? (
                <>
                  <span style={{ padding: "0 .25rem" }}>·</span>
                  {moment(`${event.dia_inici} ${event.hora_inici}`).format(
                    "LT"
                  ) +
                    (event.hora_final
                      ? "–" +
                        moment(`${event.dia_final} ${event.hora_final}`).format(
                          "LT"
                        )
                      : "")}
                </>
              ) : null}
            </div>
            {event.tipus !== "aniversari" ? (
              <StatusBadge
                tooltip={event.estat_esdeveniment}
                statusId={event.id_estat_esdeveniment}
              />
            ) : null}
          </Space>
        }
      />
      {event.localitzacio ? (
        <EventLineItem
          icon={<EnvironmentFilled />}
          content={
            <div>
              {event.establiment ? <div>{event.establiment}</div> : null}
              <div
                className={
                  event.establiment ? "calendar-event-popover--item-light" : ""
                }
              >
                {upperCaseFirst(event.localitzacio)}
              </div>
            </div>
          }
          style={{ marginTop: ".5rem" }}
        />
      ) : null}
      {event.localitzacio ? (
        <EventLineItem
          icon={<LayoutFilled />}
          content={
            <Space direction="vertical">
              {event.projectes.map(({ titol, inicials, color }) => (
                <Space>
                  <Avatar
                    size="small"
                    shape="square"
                    style={{ backgroundColor: "#" + color }}
                  >
                    {inicials}
                  </Avatar>
                  {titol}
                </Space>
              ))}
            </Space>
          }
          style={{ marginTop: ".5rem" }}
        />
      ) : null}
    </Space>
  </div>
);
