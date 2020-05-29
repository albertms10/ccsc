import { Grid, Space, Typography } from "antd";
import PropTypes from "prop-types";
import React from "react";
import "./header-title.css";

const { Title } = Typography;

const HeaderTitle = ({ title, subtitle, icon, ...rest }) => {
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

HeaderTitle.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.node,
};

export default HeaderTitle;
