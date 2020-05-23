import { Button, Form, Space } from "antd";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { LogoCorDeCambra } from "../../../../assets/icons";
import { AvisAcceptacio } from "../../../../components/avis-acceptacio";
import { usePutAvisAcceptacio } from "../../../../components/avis-acceptacio/hooks";
import { logoutRemoveUser, removeAcceptanceNotice } from "../../../../redux";
import { Container } from "../../../../standalone/container";

export default () => {
  const currentUser = useSelector(({ user }) => user.currentUser);
  const dispatch = useDispatch();
  const [loading, putAvisAcceptacio] = usePutAvisAcceptacio(
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

  return currentUser && currentUser.avisos.length > 0 ? (
    <Form form={form} onFinish={onFinish}>
      <Container className="signin-container">
        <div className="signin-form-wrapper">
          <LogoCorDeCambra
            className="signin-logo"
            style={{ color: "var(--primary-color)" }}
          />
          <AvisAcceptacio idAvis={currentUser.avisos[0]} />
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
    <Redirect to="/inicia-sessio" />
  );
};
