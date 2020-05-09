import { Layout } from "antd";
import React, { useContext } from "react";
import { MainSider } from "../../../main-sider";
import { SiderBrokenContext } from "../../contexts/sider-context";
import { SiteLayout } from "../site-layout";

export default () => {
  const broken = useContext(SiderBrokenContext);

  return (
    <div className={broken ? "broken-sider" : ""}>
      <Layout hasSider style={{ minHeight: "100vh" }}>
        <MainSider />
        <SiteLayout />
      </Layout>
    </div>
  );
};
