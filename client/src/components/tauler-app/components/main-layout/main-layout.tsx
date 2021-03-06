import { Layout } from "antd";
import { MainSider } from "components/main-sider";
import React, { useContext } from "react";
import { SiderBrokenContext } from "../../contexts/sider-context";
import { SiteLayout } from "../site-layout";

const MainLayout: React.FC = () => {
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

export default MainLayout;
