import React from 'react';
import { SubPage } from '../../../standalone/sub-page';
import { CalendariEsdeveniments } from '../../../components/calendari-esdeveniments';

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
