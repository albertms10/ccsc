import React from "react";
import { Space, Statistic } from "antd";
import { MinusOutlined } from "@ant-design/icons";

export default ({ title, statistics }) => (
  <div style={{ display: "inline-block" }}>
    <div className="ant-statistic-title">{title}</div>
    <Space>
      {statistics.map(({ key, value, icon, color }) => (
        <Statistic
          key={key}
          value={value}
          valueStyle={{ color: value === 0 ? "#aaa" : color }}
          prefix={value === 0 ? <MinusOutlined /> : icon}
          style={{ display: "inline-block" }}
        />
      ))}
    </Space>
  </div>
);
