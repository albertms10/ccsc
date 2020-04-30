import { Carousel } from "antd";
import React from "react";
import "./home-carousel.css";
import { useTitulars } from "./hooks";

export default () => {
  const [titulars] = useTitulars();

  return (
    <Carousel autoplay easing="easeInOutElastic" draggable={true}>
      {titulars.map((titular) => (
        <div key={titular.id_titular} className="carousel-item">
          {titular.titol}
        </div>
      ))}
    </Carousel>
  );
};
