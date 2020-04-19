import { Carousel } from "antd";
import React from "react";
import "./home-carousel.css";

const carouselItems = [
  {
    key: "1",
    title: "Benvinguts!",
  },
  {
    key: "2",
    title: "Concerts",
  },
  {
    key: "3",
    title: "Impressions",
  },
];

export default () => (
  <Carousel autoplay easing="easeInOutElastic" draggable={true}>
    {carouselItems.map((item) => (
      <div key={item.key} className="carousel-item">
        {item.title}
      </div>
    ))}
  </Carousel>
);
