import { Card, Divider, Spin, Tooltip } from "antd";
import React from "react";
import SubHeader from "../sub-header/sub-header";

interface InfoCardProps {
  alert?: JSX.Element;
  alertCondition?: boolean;
  title?: string;
  actionTooltip?: string;
  actionItem?: JSX.Element;
  loading?: boolean;
  info?: JSX.Element;
}

const InfoCard: React.FC<InfoCardProps> = ({
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
