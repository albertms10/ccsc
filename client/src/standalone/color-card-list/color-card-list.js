import { List } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { ColorCard } from "../color-card";
import "./color-card-list.css";

const ColorCardList = ({ dataSource, loading, mapItem, ...rest }) => (
  <List
    {...rest}
    className="color-card-list no-hover"
    grid={{
      gutter: [32, 16],
      xs: 1,
      sm: 2,
      md: 3,
      lg: 3,
      xl: 3,
      xxl: 3,
    }}
    dataSource={dataSource}
    loading={loading}
    renderItem={(item) => {
      const { title, color, description, link } = mapItem(item);
      return (
        <List.Item>
          <Link to={link}>
            <ColorCard title={title} color={color} description={description} />
          </Link>
        </List.Item>
      );
    }}
  />
);

ColorCardList.propTypes = {
  dataSource: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  mapItem: PropTypes.func.isRequired,
};

export default ColorCardList;
