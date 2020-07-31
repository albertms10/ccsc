import { Col, Row, Typography } from "antd";
import { Usuari } from "model";
import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { Authorized } from "../../components/authorized";
import { SetPageHeaderContext } from "../../components/tauler-app/components/site-layout/site-layout";
import { EntitatContext } from "../../components/tauler-app/tauler-app";
import { SafeMargin } from "../../standalone/safe-margin";
import {
  AssajosCountStatistics,
  ConcertsCountStatistics,
  ProjectesCountStatistics,
  SocisCountStatistics,
} from "../../standalone/statistics";
import { RootState } from "../../store/types";
import { ChartAssistencia } from "./components/chart-assistencia";
import { PropersAssajos } from "./components/propers-assajos";
import "./inici-page.css";

const { Title } = Typography;

const IniciPage: React.FC = () => {
  const { es_dona } = useSelector(
    ({ user }: RootState) => user.currentUser
  ) as Usuari;

  const { nom: nomEntitat } = useContext(EntitatContext);
  const setPageHeader = useContext(SetPageHeaderContext);

  useEffect(() => setPageHeader("Inici"), [setPageHeader]);

  return (
    <SafeMargin style={{ marginTop: 8 }}>
      <div className="title-wrapper">
        <Title level={3}>Benvingu{es_dona ? "da" : "t"}</Title>
        <Title>{nomEntitat}</Title>
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
        <Row gutter={[32, 32]}>
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

export default IniciPage;
