import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfileFetch, signinUserFetch } from "../../redux";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import "./inicia-sessio.css";
import { Container } from "../../standalone/container";
import { LogoCorDeCambra } from "../../icons";

export default () => {
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = (values) => {
    dispatch(signinUserFetch(values)).catch(({ message }) => {
      console.log(message);
    });
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getProfileFetch()).finally(() => {
      setLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser.hasOwnProperty("id")) history.push("/tauler");
  });

  return (
    !loading && (
      <Container className="signin-container">
        <div className="signin-form-wrapper">
          <LogoCorDeCambra
            className="signin-logo"
            style={{ color: "#1d71b8" }}
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
