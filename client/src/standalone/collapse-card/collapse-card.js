import { Collapse, Spin } from "antd";
import PropTypes from "prop-types";
import React from "react";

const CollapseCard = ({
  alert,
  alertCondition,
  title,
  actionItem,
  loading,
  active,
  disabled,
  showArrow,
  info,
  children,
  ...rest
}) => (
  <Spin spinning={loading}>
    <Collapse
      {...rest}
      {...(active ? { defaultActiveKey: ["collapse-card"] } : {})}
    >
      <Collapse.Panel
        header={title}
        key="collapse-card"
        disabled={disabled}
        showArrow={showArrow}
        extra={actionItem}
      >
        {alertCondition && alert}
        {info || children}
      </Collapse.Panel>
    </Collapse>
  </Spin>
);

CollapseCard.propTypes = {
  alert: PropTypes.node,
  alertCondition: PropTypes.bool,
  title: PropTypes.string,
  actionItem: PropTypes.node,
  loading: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  showArrow: PropTypes.bool,
  info: PropTypes.node,
};

CollapseCard.defaultProps = {
  loading: false,
  active: true,
  disabled: false,
  showArrow: true,
};

export default CollapseCard;
