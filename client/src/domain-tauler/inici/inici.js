import React from "react";
import { Col, Row } from "antd";
import { ChartHistorialSocis } from "../../components/chart-historial-socis";
import { SocisCountStatistics } from "../../standalone/statistics";

const Inici = () => (
  <div style={{ margin: "1.5rem" }}>
    <Row style={{ marginBottom: "2rem" }}>
      <Col>
        <SocisCountStatistics />
      </Col>
    </Row>
    <ChartHistorialSocis title="Historial de socis" />
  </div>
);

export default Inici;
