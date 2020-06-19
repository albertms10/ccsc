import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Modal,
  Row,
  TimePicker,
} from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TagSelectFormItemFormacions } from "../../../../components/tag-select-form-item-formacions";
import { useAfegirAssaig } from "./hooks";

const ModalAfegirAssaig = ({ idProjecte }) => {
  const { loading } = useSelector(({ assajos }) => assajos);
  const [visible, setVisible] = useState(false);
  const [form, handleOk] = useAfegirAssaig();

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setVisible(true)}
      >
        Afegeix un assaig
      </Button>
      <Modal
        title="Afegir assaig"
        onCancel={() => setVisible(false)}
        visible={visible}
        okText="Afegeix"
        cancelText="Tanca"
        confirmLoading={loading}
        onOk={() => {
          handleOk({ idProjecte }).then(() => {
            setVisible(false);
            form.resetFields();
          });
        }}
      >
        <Form form={form} layout="vertical">
          <Row type="flex">
            <Col sm={24} md={8} flex={1}>
              <Form.Item
                name="dia_inici"
                label="Dia"
                rules={[{ required: true, message: "Introdueix el dia" }]}
              >
                <DatePicker format="L" />
              </Form.Item>
            </Col>
            <Col sm={24} md={16} flex={1}>
              <Form.Item name="hora" label="Hora">
                <TimePicker.RangePicker
                  format="HH:mm"
                  minuteStep={5}
                  allowEmpty={[false, true]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item name="es_general" valuePropName="checked">
                <Checkbox>General</Checkbox>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="es_extra" valuePropName="checked">
                <Checkbox>Extra</Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <TagSelectFormItemFormacions />
        </Form>
      </Modal>
    </>
  );
};

ModalAfegirAssaig.propTypes = {
  idProjecte: PropTypes.any,
};

export default ModalAfegirAssaig;
