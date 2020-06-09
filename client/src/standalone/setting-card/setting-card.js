import { Collapse, Spin } from "antd";
import PropTypes from "prop-types";
import React from "react";

import "./setting-card.css";

const SettingCard = ({
  alert,
  alertCondition,
  title,
  actionItem,
  loading,
  active,
  info,
  children,
  ...rest
}) => {
  const src = info || children;

  return (
    <Spin spinning={loading}>
      <Collapse
        {...rest}
        className="setting-card"
        bordered={false}
        {...(active ? { defaultActiveKey: ["setting-card"] } : {})}
      >
        <Collapse.Panel header={title} key="setting-card" extra={actionItem}>
          {alertCondition && alert}
          {src}
        </Collapse.Panel>
      </Collapse>
    </Spin>
  );
};

SettingCard.propTypes = {
  alert: PropTypes.node,
  alertCondition: PropTypes.bool,
  title: PropTypes.string,
  actionItem: PropTypes.node,
  loading: PropTypes.bool,
  active: PropTypes.bool,
  info: PropTypes.node,
};

SettingCard.defaultProps = {
  active: false,
  loading: false,
};

export default SettingCard;
