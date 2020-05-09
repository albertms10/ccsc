import { Layout, Menu } from "antd";
import React from "react";
import { Link, Route } from "react-router-dom";
import { Concerts } from "../../pages-home/concerts";
import { Contacte } from "../../pages-home/contacte";
import { HomePage } from "../../pages-home/home-page";
import { Premsa } from "../../pages-home/premsa";
import { QuiSom } from "../../pages-home/qui-som";
import { LogoCorDeCambra } from "../../assets/icons";
import "./home-app.css";

const { Header, Content, Footer } = Layout;

const menuItems = [
  {
    key: "inici",
    title: "Inici",
    path: "/",
  },
  {
    key: "qui-som",
    title: "Qui som?",
    path: "/qui-som",
  },
  {
    key: "concerts",
    title: "Concerts",
    path: "/concerts",
  },
  {
    key: "premsa",
    title: "Premsa",
    path: "/premsa",
  },
  {
    key: "contacte",
    title: "Contacte",
    path: "/contacte",
  },
  {
    key: "inicia-sessio",
    title: "Inicia sessió",
    path: "/inicia-sessio",
  },
];

export default () => (
  <Layout className="layout">
    <Header className="home-page-header">
      <Link to="/">
        <LogoCorDeCambra className="header-logo" style={{ color: "#fff" }} />
      </Link>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["inici"]}>
        {menuItems.map((item) => (
          <Menu.Item key={item.key}>
            <Link to={item.path}>{item.title}</Link>
          </Menu.Item>
        ))}
      </Menu>
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
