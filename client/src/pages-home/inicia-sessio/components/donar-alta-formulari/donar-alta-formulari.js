import { LeftOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { StepsAfegirSoci } from "../../../../components/steps-afegir-soci";
import { useStepsAfegirSoci } from "../../../../components/steps-afegir-soci/hooks";
import { Container } from "../../../../standalone/container";

export default () => {
  const { inWaitingList, email } = useSelector(({ user }) => user.waitingList);
  const history = useHistory();
  const {
    steps,
    form,
    footerActions,
    handleChange,
    currentPageIndex,
    username,
  } = useStepsAfegirSoci(
    () => {
      localStorage.removeItem("access-token");
      history.push({ pathname: "/inicia-sessio", state: { username } });
    },
    true,
    "/api/socis/alta"
  );

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
          initialValues={{ email }}
        />
        <div className="signin-footer-actions">{footerActions}</div>
      </div>
    </Container>
  ) : (
    <Redirect to="/donar-alta" />
  );
};
