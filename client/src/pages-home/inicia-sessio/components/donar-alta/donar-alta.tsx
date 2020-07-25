import { LeftOutlined, MailOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input } from "antd";
import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { LogoCorDeCambra } from "../../../../assets/icons";
import { Container } from "../../../../standalone/container";
import { useValidEmailEspera } from "./hooks";

const DonarAlta: React.FC = () => {
  const [checkEmail, loading, alertMessage] = useValidEmailEspera();

  const onFinish = useCallback(({ email }) => checkEmail(email), [checkEmail]);

  return (
    <Container className="signin-container">
      <div className="signin-form-wrapper tight">
        <Link to="/inicia-sessio">
          <Button
            className="signin-form-back-button"
            type="link"
            icon={<LeftOutlined />}
          >
            Inicia sessió
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
              {
                type: "email",
                message: "Introdueix una adreça electrònica vàlida",
              },
              { required: true, message: "Introdueix l’adreça electrònica" },
              { whitespace: true, message: "Introdueix l’adreça electrònica" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Adreça electrònica"
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
              Endavant
            </Button>
          </Form.Item>
          {alertMessage ? <Alert type="warning" message={alertMessage} /> : ""}
        </Form>
      </div>
    </Container>
  );
};

export default DonarAlta;