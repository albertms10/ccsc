import { Collapse, Spin } from "antd";
import React from "react";

interface CollapseCardProps {
  alert?: JSX.Element;
  alertCondition?: boolean;
  title?: string;
  actionItem?: JSX.Element;
  loading?: boolean;
  active?: boolean;
  disabled?: boolean;
  showArrow?: boolean;
  info?: JSX.Element;
}

const CollapseCard: React.FC<CollapseCardProps> = ({
  alert,
  alertCondition,
  title,
  actionItem,
  loading = false,
  active = true,
  disabled = false,
  showArrow = true,
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

export default CollapseCard;
