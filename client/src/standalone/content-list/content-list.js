import { Col, List, Row, Space } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import "./content-list.css";

const ContentList = ({ title, loading, dataSource, action, extra, style }) => (
  <div className="content-list" style={style}>
    <Row>
      <Col span={18}>
        <Space style={{ marginBottom: ".5rem" }}>
          <div className="content-list-title">{title}</div>
          {action}
        </Space>
      </Col>
      {extra && (
        <Col span={6} className="content-list-extra">
          {extra}
        </Col>
      )}
    </Row>
    <List
      bordered
      loading={loading}
      dataSource={dataSource}
      renderItem={(item) => (
        <List.Item key={item.id} className="content-list-item">
          <Link to={item.link}>
            <List.Item.Meta
              avatar={item.avatar}
              title={item.title}
              description={item.description}
            />
          </Link>
          <div style={{ fontSize: "smaller", color: "gray" }}>{item.extra}</div>
        </List.Item>
      )}
      style={{ backgroundColor: "#fff" }}
    />
  </div>
);

ContentList.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  dataSource: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.node,
      title: PropTypes.string,
      description: PropTypes.string,
      extra: PropTypes.node,
      link: PropTypes.string,
    })
  ),
  action: PropTypes.node,
  extra: PropTypes.node,
};

ContentList.defaultProps = {
  loading: false,
};

export default ContentList;
