import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Calendar, Col, Row, Space, Spin } from "antd";
import { useAPI } from "helpers";
import { Formacio, TipusEsdeveniment } from "model";
import moment from "moment";
import { FormacioContext } from "pages/tauler/detall-formacio";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { BorderlessButton } from "standalone/borderless-button";
import { Container } from "standalone/container";
import { SearchComplete } from "standalone/search-complete";
import { searchFilter } from "utils/misc";
import "./calendari-formacio.css";
import { CalendariFormacioCell } from "./components/calendari-formacio-cell";
import { CalendariResultLabel } from "./components/calendari-result-label";

const CalendariFormacio: React.FC = () => {
  const { t } = useTranslation("events");

  const { id_formacio } = useContext(FormacioContext) as Formacio;

  const [esdeveniments, loading] = useAPI<TipusEsdeveniment[]>(
    `/formacions/${id_formacio}/esdeveniments`,
    []
  );

  return (
    <Container reducedPadding>
      <Spin spinning={loading}>
        <Calendar
          className="calendari-formacio"
          style={{ margin: "1rem" }}
          dateCellRender={(currentDay) => (
            <CalendariFormacioCell
              esdevenimentsActuals={esdeveniments.filter(({ data }) =>
                currentDay.isSame(data, "day")
              )}
            />
          )}
          headerRender={({ value, onChange }) => (
            <div className="ant-picker-calendar-header">
              <Row align="middle" gutter={16}>
                <Col>
                  <Button onClick={() => onChange(moment())}>Avui</Button>
                </Col>
                <Col>
                  <Space>
                    <BorderlessButton
                      shape="circle"
                      tooltip={t("prev month")}
                      tooltipPlacement="bottom"
                      icon={<LeftOutlined />}
                      onClick={() =>
                        onChange(value.clone().month(value.month() - 1))
                      }
                    />
                    <BorderlessButton
                      shape="circle"
                      tooltip={t("next month")}
                      tooltipPlacement="bottom"
                      icon={<RightOutlined />}
                      onClick={() =>
                        onChange(value.clone().month(value.month() + 1))
                      }
                    />
                  </Space>
                </Col>
                <Col flex={2}>
                  <div style={{ fontSize: "2rem", fontWeight: 300 }}>
                    {moment(value).format(t("date pattern"))}
                  </div>
                </Col>
                <Col flex={1}>
                  <SearchComplete
                    data={esdeveniments}
                    onSelect={(value, option) =>
                      new Promise(() => onChange(moment(option.date)))
                    }
                    filter={(value, option) =>
                      searchFilter(value, {
                        texts: [option.titol],
                        dates: [option.datahora_inici],
                      })
                    }
                    optionRenderObject={(esdeveniment) => ({
                      key: esdeveniment.id_esdeveniment,
                      value: esdeveniment.titol,
                      date: esdeveniment.data,
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

export default CalendariFormacio;
