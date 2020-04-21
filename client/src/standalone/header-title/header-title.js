import { Space, Typography } from "antd";
import React from "react";

import "./header-title.css";

const { Title } = Typography;

export default ({ title, subtitle, icon, ...rest }) => (
  <div className="header-title" {...rest}>
    <Space size="large" style={{ marginBottom: "1rem" }}>
      {icon}
      <Space direction="vertical" size={0}>
        <Title className="header-title-text" level={2}>
          {title}
        </Title>
        <div className="header-title-subtitle">{subtitle}</div>
      </Space>
    </Space>
  </div>
);
