import { Typography } from "antd";
import PropTypes from "prop-types";
import React from "react";
import ReactMarkdown from "react-markdown";

const { Title, Paragraph } = Typography;

const SeccioAvis = ({ titol, descripcio, children }) => (
  <>
    <Title level={4}>{titol}</Title>
    <Paragraph>
      <ReactMarkdown source={descripcio} />
      {children}
    </Paragraph>
  </>
);

SeccioAvis.propTypes = {
  titol: PropTypes.string,
  descripcio: PropTypes.string,
};

export default SeccioAvis;
