import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  GiftTwoTone,
  QuestionCircleTwoTone,
  WarningTwoTone,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { cloneElement } from "react";

interface StatusIconProps {
  tooltip?: string;
  size?: "middle" | "large";
  statusId?: number;
  esAniversari?: boolean;
  label?: React.ReactElement;
  style?: React.CSSProperties;
}

const StatusIcon: React.FC<StatusIconProps> = ({
  tooltip,
  size = "middle",
  statusId,
  esAniversari = false,
  label,
  style,
}) => {
  const status = [
    <CheckCircleTwoTone twoToneColor="#52c41a" />,
    <QuestionCircleTwoTone twoToneColor="#1890ff" />,
    <CloseCircleTwoTone twoToneColor="#ff4d4f" />,
    <WarningTwoTone twoToneColor="#faad14" />,
  ];

  const newStyle = {
    transform: size === "large" ? "scale(1.5) translate(3px)" : "",
    ...style,
  };

  return (
    <Tooltip title={tooltip}>
      <>
        {esAniversari ? (
          <GiftTwoTone twoToneColor="#eb2f96" style={newStyle} />
        ) : (
          statusId && cloneElement(status[statusId - 1], { style: newStyle })
        )}
        {label && <span style={{ marginLeft: ".5rem" }}>{label}</span>}
      </>
    </Tooltip>
  );
};

export default StatusIcon;
