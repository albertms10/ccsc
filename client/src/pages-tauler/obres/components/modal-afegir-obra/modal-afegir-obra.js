import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { ModalButton } from "../../../../components/modal-button";
import { useAPI } from "../../../../helpers";
import { useAfegirObra } from "./hooks";

const { Option } = Select;

export default () => {
  const { loading } = useSelector(({ obres }) => obres);

  const [form, handleOk] = useAfegirObra();
  const [idiomes, loadingIdiomes] = useAPI("/obres/idiomes");

  return (
    <ModalButton
      title="Afegir obra"
      confirmLoading={loading}
      button={
        <Button type="primary" icon={<PlusOutlined />}>
          Afegeix una obra
        </Button>
      }
      onOk={(setVisible) => {
        handleOk().then(() => {
          setVisible(false);
          form.resetFields();
        });
      }}
      renderModalBody={() => (
        <Form form={form} layout="vertical">
          <Form.Item
            name="titol"
            label="Títol"
            rules={[{ required: true, message: "Introdueix el títol" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="subtitol" label="Subtítol">
            <Input />
          </Form.Item>
          <Row type="flex">
            <Col span={14} flex={1}>
              <Form.Item name="anys" label="Anys">
                <DatePicker.RangePicker
                  picker="year"
                  allowEmpty={[false, true]}
                />
              </Form.Item>
            </Col>
            <Col span={10} flex={1}>
              <Form.Item name="id_idioma" label="Idioma">
                <Select
                  showSearch
                  allowClear
                  loading={loadingIdiomes}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {idiomes.map((idioma) => (
                    <Option key={idioma.id_idioma} value={idioma.id_idioma}>
                      {idioma.nom}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    />
  );
};
