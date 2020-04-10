import React from 'react';
import { Col, Row } from 'antd';

import Page from '../../standalone/page/Page';
import { HistorialSocisChart } from '../../components/charts';
import { SocisCountStatistics } from '../../standalone/statistics';

const Inici = () => {
  return (
    <Page title="Inici">
      <Row style={{ marginBottom: '2rem' }}>
        <Col>
          <SocisCountStatistics />
        </Col>
      </Row>
      <HistorialSocisChart title="Historial de socis" />
    </Page>
  );
};

export default Inici;
