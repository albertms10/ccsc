import { Typography } from "antd";
import React from "react";
import { StyledComponent } from "react-types";
import { Container } from "../../../../standalone/container";
import "./page-skeleton.css";

const { Title } = Typography;

interface PageSkeletonProps extends StyledComponent {
  title: string;
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
