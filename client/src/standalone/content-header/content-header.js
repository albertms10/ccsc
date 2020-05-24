import { PageHeader } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { HeaderTitle } from "../header-title";
import "./content-header.css";

const ContentHeader = ({ title, subtitle, icon, footer, ...rest }) => (
  <div {...rest} className="content-header">
    <PageHeader
      title={<HeaderTitle title={title} subtitle={subtitle} icon={icon} />}
      footer={footer}
    />
  </div>
);

ContentHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.node,
  footer: PropTypes.node,
};

export default ContentHeader;
