import React from "react";
import { List, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { BorderlessButton } from "../borderless-button";
import "./content-list.css";

export default ({ title, loading, data, style }) => {
  return (
    <div className="content-list" style={style}>
      <Space style={{ marginBottom: ".5rem" }}>
        <div className="content-list-title">{title}</div>
        <BorderlessButton shape="circle" icon={<PlusOutlined />} />
      </Space>
      <List
        bordered
        loading={loading}
        dataSource={data}
        renderItem={(item) => (
          <Link className="content-list-item" to={item.link}>
            <List.Item>
              <List.Item.Meta
                avatar={item.avatar}
                title={item.title}
                description={item.description}
              />
              <div style={{ fontSize: "smaller", color: "gray" }}>
                {item.extra}
              </div>
            </List.Item>
          </Link>
        )}
        style={{ backgroundColor: "#fff" }}
      />
    </div>
  );
};
