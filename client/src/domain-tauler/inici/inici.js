import React, { useContext, useEffect } from "react";
import { Col, Row, Typography } from "antd";
import {
  AssajosCountStatistics,
  ConcertsCountStatistics,
  ProjectesCountStatistics,
  SocisCountStatistics,
} from "../../standalone/statistics";
import { SafeMargin } from "../../standalone/safe-margin";
import { useSelector } from "react-redux";
import { SetPageHeaderContext } from "../../components/tauler-app/components/site-layout/site-layout";

const { Title } = Typography;

export default () => {
  const setPageHeader = useContext(SetPageHeaderContext);
  const { es_dona } = useSelector((store) => store.user.currentUser);

  useEffect(() => setPageHeader("Inici"), [setPageHeader]);

  return (
    <SafeMargin style={{ marginTop: 8 }}>
      <Row type="flex" gutter={[32, 32]}>
        <Col span={24}>
          <Title style={{ margin: 0, color: "#555" }}>
            Benvingu{es_dona ? "da" : "t"} a l’Associació Musical Catalana
            Crescendo
          </Title>
        </Col>
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
    </SafeMargin>
  );
};
