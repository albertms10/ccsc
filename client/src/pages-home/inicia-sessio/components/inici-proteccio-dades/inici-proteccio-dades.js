import { Button, Space } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { LogoCorDeCambra } from "../../../../assets/icons";
import { textProteccioDades } from "../../../../components/steps-afegir-soci/hooks/use-steps-afegir-soci";
import { logoutRemoveUser } from "../../../../redux";
import { Container } from "../../../../standalone/container";
import { SettingCard } from "../../../../standalone/setting-card";

export default () => {
  const currentUser = useSelector(({ user }) => user.currentUser);
  const dispatch = useDispatch();

  return currentUser.hasOwnProperty("id") ? (
    <Container className="signin-container">
      <div className="signin-form-wrapper">
        <LogoCorDeCambra
          className="signin-logo"
          style={{ color: "var(--primary-color)" }}
        />
        <SettingCard title="Protecció de dades" info={textProteccioDades} />
        <div className="signin-footer-actions">
          <Space>
            <Button onClick={() => dispatch(logoutRemoveUser())}>Enrere</Button>
            <Button type="primary">
              Ho he llegit i dono el meu consentiment
            </Button>
          </Space>
        </div>
      </div>
    </Container>
  ) : (
    <Redirect to="/inicia-sessio" />
  );
};
