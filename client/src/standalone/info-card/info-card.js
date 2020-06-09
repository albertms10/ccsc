import { Card, Spin, Tooltip, Divider } from "antd";
import React from "react";
import SubHeader from "../sub-header/sub-header";

const InfoCard = ({
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
      <Card {...rest} className="info-card">
        {alertCondition && alert}
        <div className="info-card-title">
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

export default InfoCard;
