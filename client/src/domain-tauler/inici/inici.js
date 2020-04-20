import React from "react";
import { Col, Row } from "antd";

import { Page } from "../../standalone/page";
import { ChartHistorialSocis } from "../../components/chart-historial-socis";
import { SocisCountStatistics } from "../../standalone/statistics";
import { Container } from "../../standalone/container";

const Inici = () => (
  <Container>
    <Page title="Inici">
      <Row style={{ marginBottom: "2rem" }}>
        <Col>
          <SocisCountStatistics />
        </Col>
      </Row>
      <ChartHistorialSocis title="Historial de socis" />
    </Page>
  </Container>
);

export default Inici;
