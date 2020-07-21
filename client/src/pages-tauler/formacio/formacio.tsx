import { Tabs } from "antd";
import { Formacio } from "model";
import React, { createContext, useContext, useEffect } from "react";
import { Sticky, StickyContainer } from "react-sticky";
import { IconFormacio } from "../../assets/icons";
import { CalendariFormacio } from "../../components/calendari-formacio";
import { SetPageHeaderContext } from "../../components/tauler-app/components/site-layout/site-layout";
import { ContentHeader } from "../../standalone/content-header";
import { ResumFormacio } from "./components/resum-formacio";
import "./formacio.css";

export const FormacioContext = createContext<{} | Formacio>({});

const { TabPane } = Tabs;

interface FormacioProps {
  formacio: Formacio;
}

const Formacio: React.FC<FormacioProps> = ({ formacio }) => {
  const setPageHeader = useContext(SetPageHeaderContext);

  useEffect(() => setPageHeader(formacio.nom), [setPageHeader, formacio.nom]);

  return (
    <FormacioContext.Provider value={formacio}>
      <ContentHeader
        title={formacio.nom}
        subtitle={formacio.descripcio}
        icon={<IconFormacio name={formacio.nom_curt} />}
        footer={
          <StickyContainer>
            <div className="tabs-formacio">
              <Tabs
                renderTabBar={(props, DefaultTabBar) => (
                  <Sticky bottomOffset={64}>
                    {({ style }) => <DefaultTabBar {...props} style={style} />}
                  </Sticky>
                )}
              >
                <TabPane tab="Resum" key="resum">
                  <ResumFormacio />
                </TabPane>
                <TabPane
                  tab="Calendari"
                  key="calendar"
                  style={{ backgroundColor: "var(--background-color)" }}
                >
                  <CalendariFormacio />
                </TabPane>
              </Tabs>
            </div>
          </StickyContainer>
        }
      />
    </FormacioContext.Provider>
  );
};

export default Formacio;
