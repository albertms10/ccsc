import { Col, List, Row, Space, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { StyledComponent } from "react-types";
import "./content-list.css";

interface ContentListItem {
  id: number;
  title: string;
  description?: string;
  link: string;
  actions?: React.ReactNode[];
  avatar?: React.ReactNode;
  extra?: React.ReactNode;
}

export interface ContentListBaseProps {
  title?: string;
  loading?: boolean;
  action?: React.ReactNode;
  extra?: any;
}

interface ContentListProps extends ContentListBaseProps, StyledComponent {
  dataSource: ContentListItem[];
}

const ContentList: React.FC<ContentListProps> = ({
  title,
  loading = false,
  dataSource,
  action,
  extra,
  style,
}) => (
  <div className="content-list" style={style}>
    <Row>
      <Col span={18}>
        <Space style={{ marginBottom: ".5rem" }}>
          <Typography.Title
            level={4}
            style={{ marginBottom: 0, color: "#555" }}
          >
            {title}
          </Typography.Title>
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
        <List.Item
          key={item.id}
          className="content-list-item"
          actions={item.actions}
        >
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

export default ContentList;
