import React from "react";
import { Col, Row } from "antd";
import {
  AssajosCountStatistics,
  ConcertsCountStatistics,
  ProjectesCountStatistics,
  SocisCountStatistics,
} from "../../standalone/statistics";

const Inici = () => (
  <div style={{ margin: 32 }}>
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
  </div>
);

export default Inici;
