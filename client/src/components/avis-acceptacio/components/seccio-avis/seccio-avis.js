import { Typography } from "antd";
import React from "react";
import ReactMarkdown from "react-markdown";

const { Title, Paragraph } = Typography;
export default ({ titol, descripcio, children }) => (
  <>
    <Title level={4}>{titol}</Title>
    <Paragraph>
      <ReactMarkdown source={descripcio} />
      {children}
    </Paragraph>
  </>
);
