import React from "react";
import Sticky from "react-stickynode";
import { Tabs } from "antd";
import { ContentHeader } from "../../standalone/content-header";
import { IconAgrupacio } from "../../icons";
import { ResumAgrupacio } from "./components/resum-agrupacio";
import { CalendariAgrupacio } from "./components/calendari-agrupacio";

const { TabPane } = Tabs;

export default ({ agrupacio }) => (
  <ContentHeader
    title={agrupacio.nom}
    subtitle={agrupacio.descripcio}
    icon={<IconAgrupacio name={agrupacio.nom_curt} />}
    footer={
      <Tabs
        renderTabBar={(props, DefaultTabBar) => (
          <Sticky bottomOffset={80} innerZ={5}>
            <DefaultTabBar {...props} />
          </Sticky>
        )}
      >
        <TabPane tab="Resum" key="resum">
          <ResumAgrupacio idAgrupacio={agrupacio.id_agrupacio} />
        </TabPane>
        <TabPane tab="Calendari" key="calendar">
          <CalendariAgrupacio idAgrupacio={agrupacio.id_agrupacio} />
        </TabPane>
        <TabPane tab="Projectes" key="projectes" />
        <TabPane tab="Participants" key="participants" />
      </Tabs>
    }
  />
);
