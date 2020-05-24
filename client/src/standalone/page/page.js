import { Col, Row, Typography } from "antd";
import PropTypes from "prop-types";
import React from "react";

const { Title } = Typography;

const Page = ({ title, action, children }) => (
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

Page.propTypes = {
  title: PropTypes.string,
  action: PropTypes.node,
};

export default Page;
