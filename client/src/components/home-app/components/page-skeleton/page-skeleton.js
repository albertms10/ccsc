import { Typography } from "antd";
import React from "react";
import { Container } from "../../../../standalone/container";
import "./page-skeleton.css";

const { Title } = Typography;

export default ({ title, children, ...rest }) => (
  <Container
    {...rest}
    style={{ minHeight: "calc(100vh - var(--header-height))" }}
  >
    <div className="page-skeleton">
      <Title level={1}>{title}</Title>
      {children}
    </div>
  </Container>
);
