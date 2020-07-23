import { Col, Layout, Row } from "antd";
import React from "react";
import { Link, Route } from "react-router-dom";
import { LogoCorDeCambra } from "../../assets/icons";
import { Concerts } from "../../pages-home/concerts";
import { Contacte } from "../../pages-home/contacte";
import { HomePage } from "../../pages-home/home-page";
import { Premsa } from "../../pages-home/premsa";
import { QuiSom } from "../../pages-home/qui-som";
import { HomeMenu } from "./components/home-menu";
import "./home-app.css";

const { Header, Content, Footer } = Layout;

const HomeApp: React.FC = () => (
  <Layout className="layout">
    <Header className="home-page-header">
      <Row gutter={24} justify="space-between">
        <Col xs={16} sm={10} md={8}>
          <Link to="/">
            <LogoCorDeCambra
              className="header-logo"
              style={{ color: "#fff" }}
            />
          </Link>
        </Col>
        <Col xs={8} sm={14} md={16}>
          <HomeMenu />
        </Col>
      </Row>
    </Header>
    <Content>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/qui-som" component={QuiSom} />
      <Route exact path="/concerts" component={Concerts} />
      <Route exact path="/premsa" component={Premsa} />
      <Route exact path="/contacte" component={Contacte} />
    </Content>
    <Footer style={{ textAlign: "center" }}>
      &copy; 2020 Cor de Cambra Sant Cugat
    </Footer>
  </Layout>
);

export default HomeApp;
