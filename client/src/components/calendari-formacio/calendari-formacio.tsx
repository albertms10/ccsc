import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Calendar, Col, Row, Space, Spin } from "antd";
import { useAPI } from "helpers";
import { Formacio, TipusEsdeveniment } from "model";
import dayjs from "dayjs";
import { FormacioContext } from "pages/tauler/detall-formacio";
import React, { useCallback, useContext } from "react";
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

  const dateCellRender = useCallback(
    (currentDay) => (
      <CalendariFormacioCell
        esdevenimentsActuals={esdeveniments.filter(({ data }) =>
          currentDay.isSame(data, "day")
        )}
      />
    ),
    [esdeveniments]
  );

  const searchCompleteFilter = useCallback(
    (value, option) =>
      searchFilter(value, {
        texts: [option.titol],
        dates: [option.datahora_inici],
      }),
    []
  );

  const optionRenderObject = useCallback(
    (esdeveniment) => ({
      key: esdeveniment.id_esdeveniment,
      value: esdeveniment.titol,
      date: esdeveniment.data,
      label: <CalendariResultLabel esdeveniment={esdeveniment} />,
    }),
    []
  );

  const headerRender = useCallback(
    ({ value, onChange }) => (
      <div className="ant-picker-calendar-header">
        <Row align="middle" gutter={16}>
          <Col>
            <Button onClick={() => onChange(dayjs())}>Avui</Button>
          </Col>
          <Col>
            <Space>
              <BorderlessButton
                shape="circle"
                tooltip={t("prev month")}
                tooltipPlacement="bottom"
                icon={<LeftOutlined />}
                onClick={() => onChange(value.clone().month(value.month() - 1))}
              />
              <BorderlessButton
                shape="circle"
                tooltip={t("next month")}
                tooltipPlacement="bottom"
                icon={<RightOutlined />}
                onClick={() => onChange(value.clone().month(value.month() + 1))}
              />
            </Space>
          </Col>
          <Col flex={2}>
            <div style={{ fontSize: "2rem", fontWeight: 300 }}>
              {dayjs(value).format(t("date pattern"))}
            </div>
          </Col>
          <Col flex={1}>
            <SearchComplete
              data={esdeveniments}
              onSelect={(value, option) =>
                new Promise(() => onChange(dayjs(option.date)))
              }
              filter={searchCompleteFilter}
              optionRenderObject={optionRenderObject}
            />
          </Col>
        </Row>
      </div>
    ),
    [esdeveniments, optionRenderObject, searchCompleteFilter, t]
  );

  return (
    <Container reducedPadding>
      <Spin spinning={loading}>
        <Calendar
          className="calendari-formacio"
          style={{ margin: "1rem" }}
          dateCellRender={dateCellRender}
          headerRender={headerRender}
        />
      </Spin>
    </Container>
  );
};

export default CalendariFormacio;
