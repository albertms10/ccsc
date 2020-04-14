import React from "react";
import { Col, Row, Typography } from "antd";

const { Title } = Typography;

export default ({ title, action, children }) => (
  <>
    <Row>
      <Col span={action ? 12 : 24}>
        <Title level={1}>{title}</Title>
      </Col>
      {action ? (
        <Col span={12} style={{ textAlign: "right" }}>
          {action}
        </Col>
      ) : (
        ""
      )}
    </Row>
    {children}
  </>
);
