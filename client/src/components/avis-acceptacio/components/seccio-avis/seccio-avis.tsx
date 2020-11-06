import { Typography } from "antd";
import React from "react";
import ReactMarkdown from "react-markdown";

const { Title, Paragraph } = Typography;

interface SeccioAvisProps {
  titol?: string;
  descripcio?: string;
}

const SeccioAvis: React.FC<SeccioAvisProps> = ({
  titol,
  descripcio,
  children,
}) => (
  <>
    <Title level={4}>{titol}</Title>
    <Paragraph>
      {/* @ts-ignore */}
      <ReactMarkdown>{descripcio}</ReactMarkdown>
      {children}
    </Paragraph>
  </>
);

export default SeccioAvis;
