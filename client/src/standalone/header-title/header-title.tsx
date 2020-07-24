import { Grid, Space, Typography } from "antd";
import React from "react";
import "./header-title.css";

const { Title } = Typography;

interface HeaderTitleProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({
  title,
  subtitle,
  icon,
  ...rest
}) => {
  const breakpoint = Grid.useBreakpoint();

  return (
    <div className="header-title" {...rest}>
      <Space
        size={breakpoint.lg ? "large" : "middle"}
        style={{ marginBottom: "1rem" }}
      >
        {icon}
        <Space direction="vertical" size={0}>
          <Title className="header-title-text" level={2}>
            {title}
          </Title>
          <div className="header-title-subtitle">{subtitle}</div>
        </Space>
      </Space>
    </div>
  );
};

export default HeaderTitle;
