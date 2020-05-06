import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider, Layout } from "antd";
import caES from "antd/es/locale/ca_ES";
import moment from "moment";
import "moment/locale/ca";

import { MainSider } from "../main-sider";
import { SiteLayout } from "./components/site-layout";
import { AgrupacionsContext, SiderContext } from "./contexts";

moment.locale("ca");

export default () => {
  return (
    <AgrupacionsContext>
      <SiderContext>
        <BrowserRouter basename="/tauler">
          <ConfigProvider locale={caES}>
            <Layout hasSider style={{ minHeight: "100vh" }}>
              <MainSider />
              <SiteLayout />
            </Layout>
          </ConfigProvider>
        </BrowserRouter>
      </SiderContext>
    </AgrupacionsContext>
  );
};
