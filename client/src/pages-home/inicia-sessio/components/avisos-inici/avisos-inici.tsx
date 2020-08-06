import { Button, Form, Space } from "antd";
import { Usuari } from "model";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { LogoCorDeCambra } from "../../../../assets/icons";
import { AvisAcceptacio } from "../../../../components/avis-acceptacio";
import { usePutAvisAcceptacio } from "../../../../components/avis-acceptacio/hooks";
import { Container } from "../../../../standalone/container";
import { RootState } from "../../../../store/types";
import { removeAcceptanceNotice } from "../../../../store/user/actions";
import { logoutRemoveUser } from "../../../../store/user/thunks";
import { linkText } from "../../../../utils";

const AvisosInici: React.FC = () => {
  const { t } = useTranslation("sign-in");

  const dispatch = useDispatch();

  const currentUser = useSelector(
    ({ user }: RootState) => user.currentUser
  ) as Usuari;

  const [putAvisAcceptacio, loading] = usePutAvisAcceptacio(
    currentUser.id_persona
  );

  const [form] = Form.useForm();

  const onFinish = useCallback(
    ({ acceptacions }) => {
      Object.keys(acceptacions).map(
        (acceptacio) => (acceptacions[acceptacio] = !!acceptacions[acceptacio])
      );
      putAvisAcceptacio(acceptacions, () => {
        dispatch(removeAcceptanceNotice(currentUser.avisos[0]));
      });
    },
    [putAvisAcceptacio, dispatch, currentUser.avisos]
  );

  return currentUser && currentUser.avisos && currentUser.avisos.length > 0 ? (
    <Form form={form} onFinish={onFinish}>
      <Container className="signin-container">
        <div className="signin-form-wrapper">
          <LogoCorDeCambra
            className="signin-logo"
            style={{ color: "var(--primary-color)" }}
          />
          <AvisAcceptacio nameAvis={currentUser.avisos[0]} isForm />
          <div className="signin-footer-actions">
            <Space>
              <Button onClick={() => dispatch(logoutRemoveUser())}>
                Enrere
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Ho he llegit i dono el meu consentiment
              </Button>
            </Space>
          </div>
        </div>
      </Container>
    </Form>
  ) : (
    <Redirect to={`/${linkText(t("sign in"))}`} />
  );
};

export default AvisosInici;
