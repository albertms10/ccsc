import { Card, Divider, Spin, Tooltip } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { SubHeader } from "../sub-header";

import "./setting-card.css";

const SettingCard = ({
  alert,
  alertCondition,
  title,
  actionTooltip,
  actionItem,
  loading,
  info,
  children,
  ...rest
}) => {
  const src = info || children;

  return (
    <Spin spinning={loading}>
      <Card {...rest} className="setting-card">
        {alertCondition && alert}
        <div className="setting-card-title">
          <SubHeader title={title} />
          {actionItem && <Tooltip title={actionTooltip}>{actionItem}</Tooltip>}
        </div>
        {src && (
          <>
            <Divider />
            {src}
          </>
        )}
      </Card>
    </Spin>
  );
};

SettingCard.propTypes = {
  alert: PropTypes.node,
  alertCondition: PropTypes.bool,
  title: PropTypes.string.isRequired,
  actionTooltip: PropTypes.string,
  actionItem: PropTypes.node,
  loading: PropTypes.bool,
  info: PropTypes.node,
};

SettingCard.defaultProps = {
  loading: false,
};

export default SettingCard;
