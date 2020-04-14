import React from "react";
import { PageHeader } from "antd";
import { HeaderTitle } from "../header-title";

import "./content-header.css";

export default ({ title, subtitle, icon, footer }) => (
  <div className="content-header">
    <PageHeader
      title={
        <HeaderTitle
          title={title}
          subtitle={subtitle}
          icon={icon}
          style={{ padding: "3rem 10rem 0 10rem" }}
        />
      }
      footer={footer}
    />
  </div>
);
