import React from "react";
import moment from "moment";
import { Button, Calendar, Space } from "antd";
import { CalendarTag } from "../../../../standalone/calendar-tag";
import { useCalendariEsdeveniments } from "./hooks";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { BorderlessButton } from "../../../../standalone/borderless-button";
import { Container } from "../../../../standalone/container";
import { SearchComplete } from "../../../../standalone/search-complete";

import "./calendari-agrupacio.css";

export default ({ idAgrupacio }) => {
  const esdeveniments = useCalendariEsdeveniments(idAgrupacio);

  const cellRender = (currentDay) => {
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
  };

  return (
    <Container style={{ padding: "2rem 3rem" }}>
      <Calendar
        className="calendari-agrupacio"
        dateCellRender={cellRender}
        headerRender={({ value, onChange }) => (
          <div className="ant-picker-calendar-header">
            <Space size="middle">
              <Button onClick={() => onChange(moment())}>Avui</Button>
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
              <div style={{ fontSize: "2rem", fontWeight: "300" }}>
                {moment(value).format("MMMM [de] YYYY")}
              </div>
            </Space>
            <Space>
              <SearchComplete
                data={esdeveniments}
                onSelect={(_, { date }) => onChange(moment(date))}
              />
            </Space>
          </div>
        )}
        style={{ margin: "1rem" }}
      />
    </Container>
  );
};
