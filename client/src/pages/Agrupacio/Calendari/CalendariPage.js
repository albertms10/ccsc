import React from 'react';

import SubPage from '../../SubPage';
import CalendariEsdeveniments from '../../../components/CalendariEsdeveniments/CalendariEsdeveniments';

export default () => (
  <SubPage
    routes={[
      { breadcrumbName: 'Cor de Cambra' },
      { breadcrumbName: 'Calendari' },
    ]}
    title="Calendari"
  >
    <CalendariEsdeveniments />
  </SubPage>
)
