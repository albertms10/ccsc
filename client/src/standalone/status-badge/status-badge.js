import React, { cloneElement } from "react";
import { Tooltip } from "antd";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  GiftTwoTone,
  QuestionCircleTwoTone,
  WarningTwoTone,
} from "@ant-design/icons";

/**
 *
 * @param {string} [tooltip]
 * @param {('middle'|'large')} [size]
 * @param {number} [statusId]
 * @param {boolean} [esAniversari=false]
 * @param {Object} [style]
 * @returns {React.Component}
 */
export default ({ tooltip, size, statusId, esAniversari = false, style }) => {
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
      ) : statusId ? (
        cloneElement(status[statusId - 1], { style: newStyle })
      ) : (
        ""
      )}
    </Tooltip>
  );
};
