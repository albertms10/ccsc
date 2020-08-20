import { LeftOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import { StepsAfegirSoci } from "components/steps-afegir-soci";
import { useStepsAfegirSoci } from "components/steps-afegir-soci/hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Container } from "standalone/container";
import { RootState } from "store/types";
import { linkText } from "utils";

const DonarAltaFormulari: React.FC = () => {
  const { t } = useTranslation("sign-in");

  const { inWaitingList, email } = useSelector(
    ({ user }: RootState) => user.waitingList
  );

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
      history.push({
        pathname: `/${linkText(t("sign in"))}`,
        state: { username },
      });
    },
    true,
    "/socis/alta"
  );

  return inWaitingList ? (
    <Container className="signin-container">
      <div className="signin-form-wrapper">
        <Link to={`/${linkText(t("sign up short"))}`}>
          <Button
            className="signin-form-back-button"
            type="link"
            icon={<LeftOutlined />}
          >
            ${linkText(t("common:go back"))}
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
    <Redirect to={`/${linkText(t("sign up short"))}`} />
  );
};

export default DonarAltaFormulari;
