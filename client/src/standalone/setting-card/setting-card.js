import { Card, Divider, Spin, Tooltip } from "antd";
import React from "react";
import { SubHeader } from "../sub-header";

import "./setting-card.css";

export default ({
  alert,
  alertCondition,
  title,
  actionTooltip,
  actionItem,
  loading = false,
  info,
  children,
  ...rest
}) => {
  const src = info || children;

  return (
    <Card {...rest} className="setting-card">
      {alertCondition ? alert : ""}
      <div className="setting-card-title">
        <SubHeader title={title} />
        {actionItem && <Tooltip title={actionTooltip}>{actionItem}</Tooltip>}
      </div>
      {loading ? (
        <Spin />
      ) : (
        src && (
          <>
            <Divider />
            {src}
          </>
        )
      )}
    </Card>
  );
};
