import { List } from "antd";
import { ColorCard } from "../color-card";
import React from "react";

import "./color-card-list.css";

export default ({ dataSource, loading, ...rest }) => (
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
    renderItem={({ titol, directors, agrupacions, color }) => (
      <List.Item>
        <ColorCard
          title={titol}
          color={"#" + color}
          description={
            directors
              ? `Amb la col·laboració de ${directors[0].nom}.`
              : agrupacions
              ? `Amb ${agrupacions[0].nom}.`
              : ""
          }
        />
      </List.Item>
    )}
  />
);
