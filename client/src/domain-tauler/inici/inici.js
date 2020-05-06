import React from "react";
import { Col, Row, Typography } from "antd";
import {
  AssajosCountStatistics,
  ConcertsCountStatistics,
  ProjectesCountStatistics,
  SocisCountStatistics,
} from "../../standalone/statistics";
import { SafeMargin } from "../../standalone/safe-margin";
import { useSelector } from "react-redux";

const { Title } = Typography;

export default () => {
  const { es_dona } = useSelector((store) => store.user.currentUser);

  return (
    <SafeMargin>
      <Row type="flex" gutter={[32, 32]}>
        <Col span={24}>
          <Title style={{ color: "#555" }}>
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
