import { Tabs } from "antd";
import { Formacio } from "model";
import React, { createContext, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Sticky, StickyContainer } from "react-sticky";
import { IconFormacio } from "../../assets/icons";
import { CalendariFormacio } from "../../components/calendari-formacio";
import { SetPageHeaderContext } from "../../components/tauler-app/components/site-layout/site-layout";
import { ContentHeader } from "../../standalone/content-header";
import { ResumFormacio } from "./components/resum-formacio";
import "./detall-formacio.css";

export const FormacioContext = createContext<Formacio>({} as Formacio);

const { TabPane } = Tabs;

interface FormacioProps {
  formacio: Formacio;
}

const DetallFormacio: React.FC<FormacioProps> = ({ formacio }) => {
  const { t } = useTranslation("dashboard");

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
                <TabPane tab={t("summary")} key="resum">
                  <ResumFormacio />
                </TabPane>
                <TabPane
                  tab={t("calendar")}
                  key="calendari"
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

export default DetallFormacio;
