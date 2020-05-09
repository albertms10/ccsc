import { Col, Row, Typography } from "antd";
import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { Authorized } from "../../components/authorized";
import { SetPageHeaderContext } from "../../components/tauler-app/components/site-layout/site-layout";
import { AssociacioContext } from "../../components/tauler-app/tauler-app";
import { SafeMargin } from "../../standalone/safe-margin";
import {
  AssajosCountStatistics,
  ConcertsCountStatistics,
  ProjectesCountStatistics,
  SocisCountStatistics,
} from "../../standalone/statistics";
import "./inici.css";

const { Title } = Typography;

export default () => {
  const { nom: nomAssociacio } = useContext(AssociacioContext);
  const setPageHeader = useContext(SetPageHeaderContext);
  const { es_dona } = useSelector((store) => store.user.currentUser);

  useEffect(() => setPageHeader("Inici"), [setPageHeader]);

  return (
    <SafeMargin style={{ marginTop: 8 }}>
      <div className="title-wrapper">
        <Title level={3}>Benvingu{es_dona ? "da" : "t"}</Title>
        <Title>{nomAssociacio}</Title>
      </div>
      <Row type="flex" gutter={[32, 32]}>
        <Authorized>
          <Col xs={24} sm={12} md={6} flex={1}>
            <SocisCountStatistics />
          </Col>
        </Authorized>
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
    </SafeMargin>
  );
};
