import React, { createContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import caES from "antd/es/locale/ca_ES";
import moment from "moment";
import "moment/locale/ca";
import { AgrupacionsContext, SiderContext } from "./contexts";
import { MainLayout } from "./components/main-layout";
import { useAssociacio } from "./hooks";

moment.locale("ca");

export const AssociacioContext = createContext({});

export default () => {
  const [associacio] = useAssociacio();

  return (
    <AssociacioContext.Provider value={associacio}>
      <AgrupacionsContext>
        <SiderContext>
          <BrowserRouter basename="/tauler">
            <ConfigProvider locale={caES}>
              <MainLayout />
            </ConfigProvider>
          </BrowserRouter>
        </SiderContext>
      </AgrupacionsContext>
    </AssociacioContext.Provider>
  );
};
