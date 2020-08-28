import { Col, Layout, Row } from "antd";
import { LogoCorDeCambra } from "assets/icons";
import { Concerts } from "pages/home/concerts";
import { Contacte } from "pages/home/contacte";
import { HomePage } from "pages/home/home-page";
import { Premsa } from "pages/home/premsa";
import { QuiSom } from "pages/home/qui-som";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, Route, Switch } from "react-router-dom";
import { PageNotFound } from "standalone/page-not-found";
import { linkText } from "utils";
import { HomeMenu } from "./components/home-menu";
import "./home-app.css";

const { Header, Content, Footer } = Layout;

const HomeApp: React.FC = () => {
  const { t } = useTranslation("home");

  return (
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
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path={`/${linkText(t("bio title"))}`}
            component={QuiSom}
          />
          <Route
            exact
            path={`/${linkText(t("concerts title"))}`}
            component={Concerts}
          />
          <Route
            exact
            path={`/${linkText(t("press title"))}`}
            component={Premsa}
          />
          <Route
            exact
            path={`/${linkText(t("contact title"))}`}
            component={Contacte}
          />
          <Route component={PageNotFound} />
        </Switch>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        &copy; 2020 Cor de Cambra Sant Cugat
      </Footer>
    </Layout>
  );
};

export default HomeApp;
