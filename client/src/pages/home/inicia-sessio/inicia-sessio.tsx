import { LeftOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Spin, Typography } from "antd";
import { LogoCorDeCambra } from "assets/icons";
import { FetchError } from "common";
import { Usuari } from "model";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Container } from "standalone/container";
import { RootState } from "store/types";
import { signinUserFetch } from "store/user/thunks";
import { linkText } from "utils/strings";
import { useIniciUsuari } from "./hooks";
import "./inicia-sessio.css";

const { Paragraph } = Typography;

interface IniciaSessioHistory {
  username: string;
}

interface FormIniciaSessio {
  username: string;
  password: string;
}

const IniciaSessio: React.FC = () => {
  const { t } = useTranslation(["validation", "fields", "sign-in"]);

  const dispatch = useDispatch();

  const userState = useSelector(({ user }: RootState) => user);
  const currentUser = userState.currentUser as Usuari;
  const error = userState.error as FetchError;

  const [loading, setLoading] = useState(false);

  const [fetched] = useIniciUsuari();

  const { state: locationState } = useLocation<IniciaSessioHistory>();

  const onFinish = useCallback(
    (values) => {
      setLoading(true);
      dispatch(signinUserFetch(values));
    },
    [dispatch]
  );

  useEffect(() => {
    if (currentUser.id_usuari) setLoading(false);
  }, [currentUser]);

  useEffect(() => {
    if (error.status) setLoading(false);
  }, [error]);

  return (
    <Container className="signin-container">
      <div className="signin-form-wrapper tight">
        <Link to="/">
          <Button
            className="signin-form-back-button"
            type="link"
            icon={<LeftOutlined />}
          >
            {t("home:home title")}
          </Button>
        </Link>
        <LogoCorDeCambra
          className="signin-logo"
          style={{ color: "var(--primary-color)", fontSize: "7rem" }}
        />
        <Form<FormIniciaSessio>
          className="signin-form"
          initialValues={{
            username: locationState?.username ?? "",
          }}
          onFinish={onFinish}
        >
          <Spin spinning={!fetched || loading}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: t("enter username") }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder={t("fields:username")}
                autoFocus={!locationState || !locationState.username}
                autoComplete="username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: t("enter password") }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder={t("fields:password")}
                autoFocus={locationState && !!locationState.username}
                autoComplete="current-password"
              />
            </Form.Item>
            <Form.Item>
              <a className="signin-form-forgot" href="/#">
                {t("sign-in:forgot password")}
              </a>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="signin-form-button"
                loading={loading}
              >
                {t("sign-in:sign in")}
              </Button>
            </Form.Item>
          </Spin>
          <Divider />
          <Form.Item style={{ marginBottom: 0 }}>
            <Paragraph>{t("sign-in:sign up yet")}</Paragraph>
            <Link to={`/${linkText(t("sign-in:sign up short"))}`}>
              <Button className="signin-form-button">
                {t("sign-in:sign up")}
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </Container>
  );
};

export default IniciaSessio;
