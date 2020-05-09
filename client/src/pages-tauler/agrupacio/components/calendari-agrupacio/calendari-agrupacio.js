import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Calendar, Col, Row, Space } from "antd";
import moment from "moment";
import React, { useCallback } from "react";
import { BorderlessButton } from "../../../../standalone/borderless-button";
import { CalendarTag } from "../../../../standalone/calendar-tag";
import { Container } from "../../../../standalone/container";
import { SearchComplete } from "../../../../standalone/search-complete";
import "./calendari-agrupacio.css";
import { useCalendariEsdeveniments } from "./hooks";

export default ({ idAgrupacio }) => {
  const [esdeveniments] = useCalendariEsdeveniments(idAgrupacio);

  const cellRender = useCallback(
    (currentDay) => {
      const esdevenimentsActuals = esdeveniments.filter(({ dia_inici }) =>
        currentDay.isSame(dia_inici, "day")
      );

      return (
        <Space size={-5} direction="vertical">
          {esdevenimentsActuals.map((esdeveniment) => (
            <CalendarTag
              key={esdeveniment.id_esdeveniment}
              event={esdeveniment}
            />
          ))}
        </Space>
      );
    },
    [esdeveniments]
  );

  return (
    <Container reducedPadding>
      <Calendar
        className="calendari-agrupacio"
        dateCellRender={cellRender}
        headerRender={({ value, onChange }) => (
          <div className="ant-picker-calendar-header">
            <Row align="middle" gutter={16}>
              <Col type="flex">
                <Button onClick={() => onChange(moment())}>Avui</Button>
              </Col>
              <Col type="flex">
                <Space>
                  <BorderlessButton
                    shape="circle"
                    tooltip="Mes anterior"
                    tooltipPlacement="bottom"
                    icon={<LeftOutlined />}
                    onClick={() =>
                      onChange(value.clone().month(value.month() - 1))
                    }
                  />
                  <BorderlessButton
                    shape="circle"
                    tooltip="Mes següent"
                    tooltipPlacement="bottom"
                    icon={<RightOutlined />}
                    onClick={() =>
                      onChange(value.clone().month(value.month() + 1))
                    }
                  />
                </Space>
              </Col>
              <Col type="flex" flex={2}>
                <div style={{ fontSize: "2rem", fontWeight: "300" }}>
                  {moment(value).format("MMMM [de] YYYY")}
                </div>
              </Col>
              <Col type="flex" flex={1}>
                <SearchComplete
                  data={esdeveniments}
                  onSelect={(_, { date }) => onChange(moment(date))}
                />
              </Col>
            </Row>
          </div>
        )}
        style={{ margin: "1rem" }}
      />
    </Container>
  );
};
