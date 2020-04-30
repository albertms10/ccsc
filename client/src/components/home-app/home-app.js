import React from "react";
import { Layout, Menu } from "antd";
import "./home-app.css";
import { LogoCorDeCambra } from "../../icons";
import { Link, Route } from "react-router-dom";
import { HomePage } from "../../domain-home/home-page";
import { QuiSom } from "../../domain-home/qui-som";
import { Concerts } from "../../domain-home/concerts";
import { Contacte } from "../../domain-home/contacte";

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
      <Route exact path="/contacte" component={Contacte} />
    </Content>
    <Footer style={{ textAlign: "center" }}>
      &copy; 2020 Cor de Cambra Sant Cugat
    </Footer>
  </Layout>
);
