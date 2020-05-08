import { Timeline } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { SettingCard } from "../../../../../../standalone/setting-card";
import React from "react";

export default () => {
  return (
    <SettingCard
      title="Activitat"
      info={
        <>
          <Timeline
            pending="30 dies"
            pendingDot={<ClockCircleOutlined style={{ color: "gray" }} />}
          >
            <Timeline.Item color="green" label="30 de maig de 2019">
              Alta de soci
            </Timeline.Item>
          </Timeline>
        </>
      }
    />
  );
};
