import { List } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { ColorCard } from "../color-card";
import "./color-card-list.css";

// TODO: Generalitzar el mètode renderItem
const ColorCardList = ({ dataSource, loading, mapItem, ...rest }) => (
  <List
    {...rest}
    className="color-card-list"
    grid={{
      gutter: [32, 16],
      xs: 1,
      sm: 2,
      md: 3,
    }}
    dataSource={dataSource}
    loading={loading}
    renderItem={(item) => {
      const { title, color, description } = mapItem(item);
      return (
        <List.Item>
          <ColorCard title={title} color={color} description={description} />
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
