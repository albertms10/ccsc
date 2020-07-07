import { Carousel, Typography } from "antd";
import React from "react";
import { useAPI } from "../../../../helpers";
import "./home-carousel.css";

const { Title } = Typography;

export default () => {
  const [titulars] = useAPI("/titulars");

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
