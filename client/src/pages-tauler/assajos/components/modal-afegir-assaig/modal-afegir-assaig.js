import { PlusOutlined } from "@ant-design/icons";
import TagSelect from "ant-design-pro/lib/TagSelect";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Modal,
  Row,
  Space,
  TimePicker,
} from "antd";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { IconFormacio } from "../../../../assets/icons";
import { FormacionsListContext } from "../../../../components/tauler-app/contexts/formacions-context";
import { useAfegirAssaig } from "./hooks";

export default () => {
  const formacions = useContext(FormacionsListContext);
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
          handleOk().then(() => {
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
          <Form.Item name="formacions" label="Formacions">
            <TagSelect className="" Option={null} hideCheckAll>
              {formacions.map((formacio) => (
                <TagSelect.Option
                  key={formacio.id_formacio}
                  value={formacio.id_formacio}
                >
                  <Space>
                    <IconFormacio name={formacio.nom_curt} />
                    {formacio.nom_curt}
                  </Space>
                </TagSelect.Option>
              ))}
            </TagSelect>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
