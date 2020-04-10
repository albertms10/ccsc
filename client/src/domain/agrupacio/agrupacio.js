import React from 'react';
import { Sticky, StickyContainer } from 'react-sticky';
import { Tabs } from 'antd';
import { ContentHeader } from '../../standalone/content-header';
import { IconAgrupacio } from '../../icons';
import { ResumAgrupacio } from './components/resum-agrupacio';
import { CalendariAgrupacio } from './components/calendari-agrupacio';

const { TabPane } = Tabs;

export default ({ agrupacio }) => (
  <ContentHeader
    title={agrupacio.nom}
    subtitle={agrupacio.descripcio}
    icon={<IconAgrupacio name={agrupacio.nom_curt} style={{ color: '#1d71b8', fontSize: '4rem' }} />}
    footer={
      <StickyContainer>
        <Tabs renderTabBar={(props, DefaultTabBar) => (
          <Sticky bottomOffset={80}>
            {({ style }) => (
              <DefaultTabBar {...props} style={{ ...style }} />
            )}
          </Sticky>
        )}>
          <TabPane tab="Resum" key="resum">
            <ResumAgrupacio idAgrupacio={agrupacio.id_agrupacio} />
          </TabPane>
          <TabPane tab="Calendari" key="calendar">
            <CalendariAgrupacio />
          </TabPane>
          <TabPane tab="Projectes" key="projectes" />
          <TabPane tab="Participants" key="participants" />
        </Tabs>
      </StickyContainer>
    }
  />
)
