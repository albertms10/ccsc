import { Tabs } from "antd";
import React, { useContext, useEffect } from "react";
import Sticky from "react-stickynode";
import { SetPageHeaderContext } from "../../components/tauler-app/components/site-layout/site-layout";
import { IconAgrupacio } from "../../icons";
import { ContentHeader } from "../../standalone/content-header";
import "./agrupacio.css";
import { CalendariAgrupacio } from "./components/calendari-agrupacio";
import { ResumAgrupacio } from "./components/resum-agrupacio";

const { TabPane } = Tabs;

export default ({ agrupacio }) => {
  const setPageHeader = useContext(SetPageHeaderContext);

  useEffect(() => setPageHeader(agrupacio.nom), [setPageHeader, agrupacio.nom]);

  return (
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
              <ResumAgrupacio agrupacio={agrupacio} />
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
};
