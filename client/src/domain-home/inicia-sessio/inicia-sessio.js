import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { signinUserFetch } from "../../redux";
import { Button, Form, Input } from "antd";
import { LeftOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Container } from "../../standalone/container";
import { LogoCorDeCambra } from "../../icons";
import { useIniciUsuari } from "./hooks";

import "./inicia-sessio.css";

export default () => {
  const [loading, dispatch] = useIniciUsuari();

  const onFinish = useCallback(
    (values) => {
      dispatch(signinUserFetch(values)).catch(({ message }) => {
        console.log(message);
      });
    },
    [dispatch]
  );

  return (
    !loading && (
      <Container className="signin-container">
        <div className="signin-form-wrapper">
          <Link to="/">
            <Button
              className="signin-form-back-button"
              type="link"
              icon={<LeftOutlined />}
            >
              Inici
            </Button>
          </Link>
          <LogoCorDeCambra
            className="signin-logo"
            style={{ color: "var(--primary-color)" }}
          />
          <Form className="signin-form" onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Si us plau, introdueix el nom d’usuari.",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Nom d’usuari"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Si us plau, introdueix la contrasenya.",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Contrasenya"
              />
            </Form.Item>
            <Form.Item>
              <a className="signin-form-forgot" href="#">
                Has oblidat la contrasenya?
              </a>
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="signin-form-button"
              >
                Inicia sessió
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Container>
    )
  );
};
