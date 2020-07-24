import { Typography } from "antd";
import React from "react";
import { Container } from "../../standalone/container";
import { HomeCarousel } from "./components/home-carousel";

const HomePage: React.FC = () => (
  <>
    <HomeCarousel />
    <Container>
      <Typography.Title level={1}>Pàgina d’inici</Typography.Title>
    </Container>
  </>
);

export default HomePage;
