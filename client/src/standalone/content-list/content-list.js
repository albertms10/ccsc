import { PlusOutlined } from "@ant-design/icons";
import { List, Space } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { BorderlessButton } from "../borderless-button";
import "./content-list.css";

const ContentList = ({ title, loading, dataSource, style }) => (
  <div className="content-list" style={style}>
    <Space style={{ marginBottom: ".5rem" }}>
      <div className="content-list-title">{title}</div>
      <BorderlessButton shape="circle" icon={<PlusOutlined />} />
    </Space>
    <List
      bordered
      loading={loading}
      dataSource={dataSource}
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

ContentList.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.node,
      title: PropTypes.string,
      description: PropTypes.string,
      extra: PropTypes.node,
      link: PropTypes.string,
    })
  ),
};

ContentList.defaultProps = {
  loading: false,
};

export default ContentList;
