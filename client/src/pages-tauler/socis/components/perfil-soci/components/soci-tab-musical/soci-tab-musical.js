import { ClockCircleOutlined } from "@ant-design/icons";
import { Timeline } from "antd";
import React from "react";
import { SettingCard } from "../../../../../../standalone/setting-card";

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
