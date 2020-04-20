import React from "react";
import { PageHeader } from "antd";
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
