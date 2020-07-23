import { Typography } from "antd";
import React from "react";
import { Container } from "../../../../standalone/container";
import "./page-skeleton.css";

const { Title } = Typography;

interface PageSkeletonProps {
  title: string;
  style?: React.CSSProperties;
}

const PageSkeleton: React.FC<PageSkeletonProps> = ({
  title,
  children,
  ...rest
}) => (
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

export default PageSkeleton;
