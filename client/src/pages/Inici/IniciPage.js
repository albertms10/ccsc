import React from 'react';
import { Col, Row } from 'antd';

import Page from '../Page';
import HistorialSocisChart from '../../components/Charts/HistorialSocisChart';
import SocisCountStatistic from '../../components/templates/Statistics/SocisCountStatistic';

const IniciPage = () => {
  return (
    <Page title="Inici">
      <Row style={{ marginBottom: '2rem' }}>
        <Col>
          <SocisCountStatistic />
        </Col>
      </Row>
      <HistorialSocisChart title="Historial de socis" />
    </Page>
  );
};

export default IniciPage;
