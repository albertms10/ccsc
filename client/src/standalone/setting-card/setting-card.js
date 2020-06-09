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
}) => (
  <Spin spinning={loading}>
    <Collapse
      {...rest}
      className="setting-card"
      {...(active ? { defaultActiveKey: ["setting-card"] } : {})}
    >
      <Collapse.Panel header={title} key="setting-card" extra={actionItem}>
        {alertCondition && alert}
        {info || children}
      </Collapse.Panel>
    </Collapse>
  </Spin>
);

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
  loading: false,
  active: false,
};

export default SettingCard;
