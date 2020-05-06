import React from "react";
import Sticky from "react-stickynode";
import { Tabs } from "antd";
import { ContentHeader } from "../../standalone/content-header";
import { IconAgrupacio } from "../../icons";
import { ResumAgrupacio } from "./components/resum-agrupacio";
import { CalendariAgrupacio } from "./components/calendari-agrupacio";

import "./agrupacio.css";

const { TabPane } = Tabs;

export default ({ agrupacio }) => (
  <ContentHeader
    title={agrupacio.nom}
    subtitle={agrupacio.descripcio}
    icon={<IconAgrupacio name={agrupacio.nom_curt} />}
    footer={
      <div className="tabs-agrupacio">
        <Tabs
          renderTabBar={(props, DefaultTabBar) => (
            <Sticky top={64} bottomOffset={80} innerZ={5}>
              <DefaultTabBar {...props} />
            </Sticky>
          )}
        >
          <TabPane tab="Resum" key="resum">
            <ResumAgrupacio idAgrupacio={agrupacio.id_agrupacio} />
          </TabPane>
          <TabPane
            tab="Calendari"
            key="calendar"
            style={{ backgroundColor: "var(--background-color)" }}
          >
            <CalendariAgrupacio idAgrupacio={agrupacio.id_agrupacio} />
          </TabPane>
          <TabPane tab="Projectes" key="projectes" />
          <TabPane tab="Integrants" key="integrants" />
        </Tabs>
      </div>
    }
  />
);
