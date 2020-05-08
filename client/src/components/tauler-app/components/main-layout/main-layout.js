import { MainSider } from "../../../main-sider";
import { SiteLayout } from "../site-layout";
import { Layout } from "antd";
import React, { useContext } from "react";
import { SiderBrokenContext } from "../../contexts/sider-context";

export default () => {
  const broken = useContext(SiderBrokenContext);

  return (
    <Layout
      className={broken ? "broken-sider" : ""}
      hasSider
      style={{ minHeight: "100vh" }}
    >
      <MainSider />
      <SiteLayout />
    </Layout>
  );
};
