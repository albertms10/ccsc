import React from "react";
import { Breadcrumb, Layout, Menu } from "antd";
import { Container } from "../../standalone/container";

const { Header, Content, Footer } = Layout;

export default () => {
  return (
    <Layout className="layout">
      <Header>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">Inici</Menu.Item>
          <Menu.Item key="2">Qui som?</Menu.Item>
          <Menu.Item key="3">Concerts</Menu.Item>
          <Menu.Item key="4">Contacta’ns</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Container>
          <h1>Cor de Cambra Sant Cugat</h1>
        </Container>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        &copy; 2020 Cor de Cambra Sant Cugat
      </Footer>
    </Layout>
  );
};
