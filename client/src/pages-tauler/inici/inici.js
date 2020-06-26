import { Col, Row, Typography } from "antd";
import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { Authorized } from "../../components/authorized";
import { SetPageHeaderContext } from "../../components/tauler-app/components/site-layout/site-layout";
import { AgrupacioContext } from "../../components/tauler-app/tauler-app";
import { SafeMargin } from "../../standalone/safe-margin";
import {
  AssajosCountStatistics,
  ConcertsCountStatistics,
  ProjectesCountStatistics,
  SocisCountStatistics,
} from "../../standalone/statistics";
import { ChartAssistencia } from "./components/chart-assistencia";
import { PropersAssajos } from "./components/propers-assajos";
import "./inici.css";

const { Title } = Typography;

export default () => {
  const { nom: nomAgrupacio } = useContext(AgrupacioContext);
  const setPageHeader = useContext(SetPageHeaderContext);
  const { es_dona } = useSelector((store) => store.user.currentUser);

  useEffect(() => setPageHeader("Inici"), [setPageHeader]);

  return (
    <SafeMargin style={{ marginTop: 8 }}>
      <div className="title-wrapper">
        <Title level={3}>Benvingu{es_dona ? "da" : "t"}</Title>
        <Title>{nomAgrupacio}</Title>
      </div>

      <Title level={4} className="secondary-title">
        Proper assaig
      </Title>
      <PropersAssajos style={{ marginBottom: "2rem" }} />

      <Authorized>
        <Title
          level={4}
          className="secondary-title"
          style={{ marginBottom: "1.2rem" }}
        >
          Resum
        </Title>
        <Row type="flex" gutter={[32, 32]}>
          <Col xs={24} sm={12} md={6} flex={1}>
            <SocisCountStatistics />
          </Col>
          <Col xs={24} sm={12} md={6} flex={1}>
            <ProjectesCountStatistics />
          </Col>
          <Col xs={24} sm={12} md={6} flex={1}>
            <ConcertsCountStatistics />
          </Col>
          <Col xs={24} sm={12} md={6} flex={1}>
            <AssajosCountStatistics />
          </Col>
        </Row>
        <ChartAssistencia />
      </Authorized>
    </SafeMargin>
  );
};
