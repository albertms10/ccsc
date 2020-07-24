import { Carousel, Typography } from "antd";
import { Titular } from "model";
import React from "react";
import { useAPI } from "../../../../helpers";
import "./home-carousel.css";

const { Title } = Typography;

const HomeCarousel: React.FC = () => {
  const [titulars] = useAPI<Titular[]>("/titulars", []);

  return (
    <Carousel easing="easeInOutElastic" draggable>
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

export default HomeCarousel;
