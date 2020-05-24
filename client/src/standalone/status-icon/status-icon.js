import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  GiftTwoTone,
  QuestionCircleTwoTone,
  WarningTwoTone,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import PropTypes from "prop-types";
import React, { cloneElement } from "react";

const StatusIcon = ({
  tooltip,
  size,
  statusId,
  esAniversari,
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
    ...style,
    transform: size === "large" ? "scale(1.5) translate(3px)" : "",
  };

  return (
    <Tooltip title={tooltip}>
      {esAniversari ? (
        <GiftTwoTone twoToneColor="#eb2f96" style={newStyle} />
      ) : (
        statusId && cloneElement(status[statusId - 1], { style: newStyle })
      )}
      {label && <span style={{ marginLeft: ".5rem" }}>{label}</span>}
    </Tooltip>
  );
};

const SIZES = ["middle", "large"];

StatusIcon.propTypes = {
  tooltip: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
  statusId: PropTypes.number,
  esAniversari: PropTypes.bool,
  label: PropTypes.string,
};

StatusIcon.defaultProps = {
  size: SIZES[0],
  esAniversari: false,
};

export default StatusIcon;
