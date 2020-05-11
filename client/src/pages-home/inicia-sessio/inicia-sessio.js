import { LeftOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, message, Typography } from "antd";
import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { LogoCorDeCambra } from "../../assets/icons";
import { signinUserFetch } from "../../redux";
import { Container } from "../../standalone/container";
import { useIniciUsuari } from "./hooks";
import "./inicia-sessio.css";

const { Paragraph } = Typography;

export default () => {
  const [loading, dispatch] = useIniciUsuari();
  const error = useSelector((state) => state.user.error);
  const { state: locationState } = useLocation();

  const onFinish = useCallback((values) => dispatch(signinUserFetch(values)), [
    dispatch,
  ]);

  useEffect(() => {
    if (error.status >= 400 && error.status < 500)
      message.warning(error.message);
    else if (error.message) message.error(error.message);
  }, [error]);

  return (
    !loading && (
      <Container className="signin-container">
        <div className="signin-form-wrapper tight">
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
          <Form
            className="signin-form"
            initialValues={{
              username: locationState ? locationState.username : "",
            }}
            onFinish={onFinish}
          >
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
                autoFocus={!locationState || !locationState.username}
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
                autoFocus={locationState && locationState.username}
              />
            </Form.Item>
            <Form.Item>
              <a className="signin-form-forgot" href="/#">
                Has oblidat la contrasenya?
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="signin-form-button"
              >
                Inicia sessió
              </Button>
            </Form.Item>
            <Divider />
            <Form.Item style={{ marginBottom: 0 }}>
              <Paragraph>Tenim la teva adreça a la llista d’espera?</Paragraph>
              <Link to="/donar-alta">
                <Button type="secondary" className="signin-form-button">
                  Donar-se d’alta
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </div>
      </Container>
    )
  );
};