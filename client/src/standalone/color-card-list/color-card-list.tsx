import { List } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { StyledComponent } from "react-types";
import { ColorCard } from "../color-card";
import "./color-card-list.css";

interface ColorCardListItem {
  title: string;
  color: string;
  description: string;
  link: string;
}

interface ColorCardListProps extends StyledComponent {
  dataSource: ColorCardListItem[];
  loading?: boolean;
}

const ColorCardList: React.FC<ColorCardListProps> = ({
  dataSource,
  loading,
  ...rest
}) => (
  <List
    {...rest}
    className="color-card-list no-hover"
    grid={{
      gutter: 32,
      xs: 1,
      sm: 2,
      md: 3,
      lg: 3,
      xl: 3,
      xxl: 3,
    }}
    dataSource={dataSource}
    loading={loading}
    renderItem={({ title, color, description, link }) => (
      <List.Item>
        <Link to={link}>
          <ColorCard title={title} color={color} description={description} />
        </Link>
      </List.Item>
    )}
  />
);

export default ColorCardList;
