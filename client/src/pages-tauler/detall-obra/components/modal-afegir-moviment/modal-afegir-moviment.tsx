import { Col, Form, Input, Row, TimePicker } from "antd";
import React, { useContext } from "react";
import { ModalButton } from "../../../../components/modal-button";
import { ModalButtonBaseProps } from "../../../../components/modal-button/modal-button";
import { ObraContext } from "../../detall-obra";
import { useAfegirMoviment } from "./hooks";

interface ModalAfegirMovimentProps extends ModalButtonBaseProps {
  getMoviments: Function;
}

const ModalAfegirMoviment: React.FC<ModalAfegirMovimentProps> = ({
  getMoviments,
  title = "Afegir moviment",
  ...rest
}) => {
  const { id_obra } = useContext(ObraContext);
  const [form, loading, handleOk] = useAfegirMoviment(id_obra);

  return (
    <ModalButton
      title={title}
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
              <Form.Item name="ordre" label="Núm.">
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col sm={18} md={20}>
              <Form.Item name="titol" label="Títol">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item name="durada" label="Durada">
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
