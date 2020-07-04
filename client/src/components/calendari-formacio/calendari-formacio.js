import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Calendar, Col, Row, Space, Spin } from "antd";
import moment from "moment";
import React, { useContext } from "react";
import { useAPI } from "../../helpers";
import { FormacioContext } from "../../pages-tauler/formacio/formacio";
import { BorderlessButton } from "../../standalone/borderless-button";
import { Container } from "../../standalone/container";
import { SearchComplete } from "../../standalone/search-complete";
import { searchFilter } from "../../utils";
import "./calendari-formacio.css";
import { CalendariFormacioCell } from "./components/calendari-formacio-cell";
import { CalendariResultLabel } from "./components/calendari-result-label";

export default () => {
  const { id_formacio } = useContext(FormacioContext);
  const [esdeveniments, loading] = useAPI(
    `/api/formacions/${id_formacio}/esdeveniments`
  );

  return (
    <Container reducedPadding>
      <Spin spinning={loading}>
        <Calendar
          className="calendari-formacio"
          style={{ margin: "1rem" }}
          dateCellRender={(currentDay) => (
            <CalendariFormacioCell
              esdevenimentsActuals={esdeveniments.filter(({ dia_inici }) =>
                currentDay.isSame(dia_inici, "day")
              )}
            />
          )}
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
                    onSelect={(value, option) => onChange(moment(option.date))}
                    filter={(value, option) =>
                      searchFilter(value, {
                        texts: [option.titol],
                        dates: [option.data_inici],
                      })
                    }
                    optionRenderObject={(esdeveniment) => ({
                      key: esdeveniment.id_esdeveniment,
                      value: (
                        <span key={esdeveniment.id_esdeveniment}>
                          {esdeveniment.titol}
                        </span>
                      ),
                      date: esdeveniment.dia_inici,
                      label: (
                        <CalendariResultLabel esdeveniment={esdeveniment} />
                      ),
                    })}
                  />
                </Col>
              </Row>
            </div>
          )}
        />
      </Spin>
    </Container>
  );
};
