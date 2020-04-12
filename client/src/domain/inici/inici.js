import React from 'react';
import { Col, Row } from 'antd';

import { Page } from '../../standalone/page';
import { HistorialSocisChart } from '../../components/charts';
import { SocisCountStatistics } from '../../standalone/statistics';
import { Container } from '../../standalone/container';

const Inici = () => {
  return (
    <Container>
      <Page title="Inici">
        <Row style={{ marginBottom: '2rem' }}>
          <Col>
            <SocisCountStatistics />
          </Col>
        </Row>
        <HistorialSocisChart title="Historial de socis" />
      </Page>
    </Container>
  );
};

export default Inici;
