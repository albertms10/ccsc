import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { LogoCorDeCambra } from "../../../../assets/icons";
import { Container } from "../../../../standalone/container";

export default () => {
  const inWaitingList = useSelector(({ user }) => user.inWaitingList);

  return inWaitingList ? (
    <Container className="signin-container">
      <div className="signin-form-wrapper">
        <Link to="/donar-alta">
          <Button
            className="signin-form-back-button"
            type="link"
            icon={<LeftOutlined />}
          >
            Tornar enrere
          </Button>
        </Link>
        <LogoCorDeCambra
          className="signin-logo"
          style={{ color: "var(--primary-color)" }}
        />
      </div>
    </Container>
  ) : (
    <Redirect to="/donar-alta" />
  );
};
