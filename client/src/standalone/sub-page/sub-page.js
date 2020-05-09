import { RightOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import React from "react";
import Page from "../page/page";
import "./sub-page.css";

export default ({ routes, title, subtitle, action, children }) => (
  <>
    <PageHeader
      className="site-page-header"
      title={title}
      breadcrumb={{ separator: <RightOutlined />, routes }}
      subTitle={subtitle}
      extra={[action]}
    />
    <Page>{children}</Page>
  </>
);
