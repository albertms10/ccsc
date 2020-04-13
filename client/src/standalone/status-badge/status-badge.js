import React, { cloneElement } from 'react';
import { Tooltip } from 'antd';
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  GiftTwoTone,
  QuestionCircleTwoTone,
  WarningTwoTone,
} from '@ant-design/icons';

export default ({ tooltip, statusId, esAniversari, style }) => {
  const status = [
    <CheckCircleTwoTone twoToneColor="#52c41a" />,
    <QuestionCircleTwoTone twoToneColor="#1890ff" />,
    <CloseCircleTwoTone twoToneColor="#ff4d4f" />,
    <WarningTwoTone twoToneColor="#faad14" />,
  ];

  return (
    <Tooltip title={tooltip}>
      {esAniversari ? (
        <GiftTwoTone twoToneColor="#eb2f96" style={style} />
      ) : statusId ? (
        cloneElement(status[statusId - 1], { style })
      ) : (
        ""
      )}
    </Tooltip>
  );
};
