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
  TimePicker,
} from "antd";
import moment from "moment";
import React, { useContext, useState } from "react";
import { AgrupacionsListContext } from "../../../../components/tauler-app/contexts/agrupacions-context";
import { useAfegirAssaig } from "./hooks";

export default () => {
  const agrupacions = useContext(AgrupacionsListContext);
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
        onOk={handleOk}
      >
        <Form form={form} layout="vertical">
          <Row type="flex">
            <Col sm={24} md={8} flex={1}>
              <Form.Item
                name="dia_inici"
                label="Dia"
                rules={[{ required: true, message: "Introdueix el dia" }]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
            <Col sm={24} md={16} flex={1}>
              <Form.Item name="hora" label="Hora">
                <TimePicker.RangePicker
                  format="HH:mm"
                  minuteStep={5}
                  allowEmpty={[false, true]}
                  defaultPickerValue={[moment(new Date("19:00"))]}
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
          <Form.Item name="agrupacions" label="Agrupacions">
            <TagSelect className="" Option={null} hideCheckAll>
              {agrupacions.map((agrupacio) => (
                <TagSelect.Option
                  key={agrupacio.id_agrupacio}
                  value={agrupacio.id_agrupacio}
                >
                  {agrupacio.nom_curt}
                </TagSelect.Option>
              ))}
            </TagSelect>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
