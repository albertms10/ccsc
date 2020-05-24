import { RightOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import PropTypes from "prop-types";
import React from "react";
import Page from "../page/page";
import "./sub-page.css";

const SubPage = ({ routes, title, subtitle, action, children }) => (
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

SubPage.propTypes = {
  routes: PropTypes.array,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  action: PropTypes.node,
};

export default SubPage;
