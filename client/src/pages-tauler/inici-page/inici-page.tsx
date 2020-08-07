import { Col, Row, Typography } from "antd";
import { Usuari } from "model";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("dashboard");

  const { es_dona } = useSelector(
    ({ user }: RootState) => user.currentUser
  ) as Usuari;

  const { nom: nomEntitat } = useContext(EntitatContext);
  const setPageHeader = useContext(SetPageHeaderContext);

  useEffect(() => {
    setPageHeader(t("home"));
  }, [setPageHeader, t]);

  return (
    <SafeMargin style={{ marginTop: 8 }}>
      <div className="title-wrapper">
        <Title level={3}>{t(es_dona ? "f welcome" : "m welcome")}</Title>
        <Title>{nomEntitat}</Title>
      </div>

      <Title level={4} className="secondary-title">
        {t("next rehearsal")}
      </Title>
      <PropersAssajos style={{ marginBottom: "2rem" }} />

      <Authorized>
        <Title
          level={4}
          className="secondary-title"
          style={{ marginBottom: "1.2rem" }}
        >
          {t("summary")}
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
