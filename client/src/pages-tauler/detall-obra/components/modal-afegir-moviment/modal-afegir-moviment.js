import { PlusOutlined } from "@ant-design/icons";
import { Col, Form, Input, Modal, Row, TimePicker } from "antd";
import React, { useContext, useState } from "react";
import { BorderlessButton } from "../../../../standalone/borderless-button";
import { ObraContext } from "../../detall-obra";
import { useAfegirMoviment } from "./hooks";

export default ({ getMoviments }) => {
  const { id_obra } = useContext(ObraContext);
  const [visible, setVisible] = useState(false);
  const [form, loading, handleOk] = useAfegirMoviment(id_obra);

  return (
    <>
      <BorderlessButton
        icon={<PlusOutlined />}
        onClick={() => setVisible(true)}
      />
      <Modal
        title="Afegir moviment"
        onCancel={() => setVisible(false)}
        visible={visible}
        okText="Afegeix"
        cancelText="Tanca"
        confirmLoading={loading}
        onOk={() => {
          handleOk().then(() => {
            setVisible(false);
            form.resetFields();
            getMoviments();
          });
        }}
      >
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
      </Modal>
    </>
  );
};
