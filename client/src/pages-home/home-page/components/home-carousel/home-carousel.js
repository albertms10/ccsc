import { Carousel, Typography } from "antd";
import React from "react";
import "./home-carousel.css";
import { useTitulars } from "./hooks";

const { Title } = Typography;

export default () => {
  const [titulars] = useTitulars();

  return (
    <Carousel easing="easeInOutElastic" draggable={true}>
      {titulars.map((titular) => (
        <div key={titular.id_titular}>
          <div className="carousel-item">
            <Title level={2} className="carousel-item-title">
              {titular.titol}
            </Title>
          </div>
        </div>
      ))}
    </Carousel>
  );
};
