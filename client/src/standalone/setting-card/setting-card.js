import React from "react";
import { Card, Divider, Tooltip } from "antd";
import { SubHeader } from "../sub-header";

import "./setting-card.css";

export default ({
  alert,
  alertCondition,
  title,
  actionTooltip,
  actionItem,
  info,
  ...rest
}) => (
  <Card {...rest} className="setting-card">
    {alertCondition ? alert : ""}
    <div className="setting-card-title">
      <SubHeader title={title} />
      {actionItem ? <Tooltip title={actionTooltip}>{actionItem}</Tooltip> : ""}
    </div>
    {info ? (
      <>
        <Divider />
        {info}
      </>
    ) : (
      ""
    )}
  </Card>
);
