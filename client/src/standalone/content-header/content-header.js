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
          style={{
            paddingTop: "3rem",
            paddingRight: 0,
            paddingBottom: 0,
            paddingLeft: "15%",
            width: "max-content",
          }}
        />
      }
      footer={footer}
    />
  </div>
);
