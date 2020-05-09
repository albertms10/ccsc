import { LeftOutlined } from "@ant-design/icons";
import { Button, Divider, Space } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { StepsAfegirSoci } from "../../../../components/steps-afegir-soci";
import { useStepsAfegirSoci } from "../../../../components/steps-afegir-soci/components/hooks";
import { Container } from "../../../../standalone/container";

export default () => {
  const inWaitingList = useSelector(({ user }) => user.inWaitingList);
  const {
    steps,
    form,
    footerActions,
    handleChange,
    currentPageIndex,
    alertProteccio,
    setAlertProteccio,
    username,
    loadingUsername,
  } = useStepsAfegirSoci();

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
        <Divider />
        <StepsAfegirSoci
          steps={steps}
          form={form}
          currentPageIndex={currentPageIndex}
          handleChange={handleChange}
          username={username}
          loadingUsername={loadingUsername}
          alertProteccio={alertProteccio}
          setAlertProteccio={setAlertProteccio}
        />
        <div className="signin-footer-actions">
          <Space>{footerActions}</Space>
        </div>
      </div>
    </Container>
  ) : (
    <Redirect to="/donar-alta" />
  );
};
