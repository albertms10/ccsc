import { Col, Row, Typography } from "antd";
import React from "react";

const { Title } = Typography;

interface PageProps {
  title: string;
  action: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ title, action, children }) => (
  <>
    <Row>
      <Col span={action ? 12 : 24}>
        <Title level={1}>{title}</Title>
      </Col>
      {action && (
        <Col span={12} style={{ textAlign: "right" }}>
          {action}
        </Col>
      )}
    </Row>
    {children}
  </>
);

export default Page;
