import { Col, Form, Input, Row, TimePicker } from "antd";
import { ModalButton, ModalButtonBaseProps } from "components/modal-button";
import { ObraContext } from "pages/tauler/detall-obra";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useAfegirMoviment } from "./hooks";

interface ModalAfegirMovimentProps extends ModalButtonBaseProps {
  getMoviments: () => void;
}

const ModalAfegirMoviment: React.FC<ModalAfegirMovimentProps> = ({
  getMoviments,
  title,
  ...rest
}) => {
  const { t } = useTranslation("fields");

  const { id_obra } = useContext(ObraContext);

  const [form, loading, handleOk] = useAfegirMoviment(id_obra);

  return (
    <ModalButton
      title={title || t("actions:add movement")}
      confirmLoading={loading}
      onOk={(setVisible) => {
        handleOk().then(() => {
          setVisible(false);
          form.resetFields();
          getMoviments();
        });
      }}
      renderModalBody={() => (
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col sm={6} md={4}>
              <Form.Item name="ordre" label={t("no.")}>
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col sm={18} md={20}>
              <Form.Item name="titol_moviment" label={t("title")}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item name="durada" label={t("duration")}>
                <TimePicker format="mm:ss" showNow={false} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
      {...rest}
    />
  );
};

export default ModalAfegirMoviment;
