import { LeftOutlined, MailOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input } from "antd";
import { LogoCorDeCambra } from "assets/icons";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Container } from "standalone/container";
import { linkText } from "utils";
import { useValidEmailEspera } from "./hooks";

const DonarAlta: React.FC = () => {
  const { t } = useTranslation(["fields", "sign-in", "validation"]);

  const [checkEmail, loading, alertMessage] = useValidEmailEspera();

  const onFinish = useCallback(({ email }) => checkEmail(email), [checkEmail]);

  return (
    <Container className="signin-container">
      <div className="signin-form-wrapper tight">
        <Link to={`/${linkText(t("sign in"))}`}>
          <Button
            className="signin-form-back-button"
            type="link"
            icon={<LeftOutlined />}
          >
            {t("sign in")}
          </Button>
        </Link>
        <LogoCorDeCambra
          className="signin-logo"
          style={{ color: "var(--primary-color)" }}
        />
        <Form className="signin-form" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              { type: "email", message: t("enter valid email") },
              { required: true, message: t("enter email") },
              { whitespace: true, message: t("enter email") },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder={t("email")}
              autoFocus
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="signin-form-button"
              loading={loading}
            >
              {t("common:go ahead")}
            </Button>
          </Form.Item>
          {alertMessage ? <Alert type="warning" message={alertMessage} /> : ""}
        </Form>
      </div>
    </Container>
  );
};

export default DonarAlta;
