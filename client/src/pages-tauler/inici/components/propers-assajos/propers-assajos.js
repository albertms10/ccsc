import { Card, Carousel, Spin } from "antd";
import React from "react";
import { usePropersAssajos } from "./hooks";

export default ({ style }) => {
  const [propersAssajos, loadingPropersAssajos] = usePropersAssajos();

  return (
    <Spin spinning={loadingPropersAssajos}>
      <Carousel draggable style={style}>
        {propersAssajos.map((assaig) => (
          <Card>{assaig.id_assaig}</Card>
        ))}
      </Carousel>
    </Spin>
  );
};
