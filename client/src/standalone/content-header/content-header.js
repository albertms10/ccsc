import { PageHeader } from "antd";
import React from "react";
import { HeaderTitle } from "../header-title";
import "./content-header.css";

export default ({ title, subtitle, icon, footer, ...rest }) => (
  <div {...rest} className="content-header">
    <PageHeader
      title={<HeaderTitle title={title} subtitle={subtitle} icon={icon} />}
      footer={footer}
    />
  </div>
);
