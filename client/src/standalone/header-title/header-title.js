import { Space, Typography } from "antd";
import React from "react";
import Media from "react-media";

import "./header-title.css";

const { Title } = Typography;

export default ({ title, subtitle, icon, ...rest }) => (
  <div className="header-title" {...rest}>
    <Media query={{ maxWidth: 599 }}>
      {(smallSize) => (
        <Space
          size={smallSize ? "middle" : "large"}
          style={{ marginBottom: "1rem" }}
        >
          {icon}
          <Space direction="vertical" size={0}>
            <Title className="header-title-text" level={2}>
              {title}
            </Title>
            <div className="header-title-subtitle">{subtitle}</div>
          </Space>
        </Space>
      )}
    </Media>
  </div>
);
