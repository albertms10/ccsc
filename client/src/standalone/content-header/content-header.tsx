import { PageHeader } from "antd";
import React from "react";
import { HeaderTitle } from "standalone/header-title";
import "./content-header.css";

interface ContentHeaderProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  footer: React.ReactNode;
}

const ContentHeader: React.FC<ContentHeaderProps> = ({
  title,
  subtitle,
  icon,
  footer,
  ...rest
}) => (
  <div {...rest} className="content-header">
    <PageHeader
      title={<HeaderTitle title={title} subtitle={subtitle} icon={icon} />}
      footer={footer}
    />
  </div>
);

export default ContentHeader;
