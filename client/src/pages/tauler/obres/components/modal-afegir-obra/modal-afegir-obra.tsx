import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import { ModalButton } from "components/modal-button";
import { useAPI } from "helpers";
import { Idioma } from "model";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "store/types";
import { useAfegirObra } from "./hooks";

const { Option } = Select;

const ModalAfegirObra: React.FC = () => {
  const { t } = useTranslation(["validation", "fields", "actions"]);

  const { loading } = useSelector(({ obres }: RootState) => obres);

  const [form, handleOk] = useAfegirObra();

  const [idiomes, loadingIdiomes] = useAPI<Idioma[]>("/obres/idiomes", []);

  return (
    <ModalButton
      title={t("actions:add work")}
      confirmLoading={loading}
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
            label={t("fields:title")}
            rules={[{ required: true, message: t("enter title") }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="subtitol" label={t("fields:subtitle")}>
            <Input />
          </Form.Item>
          <Row>
            <Col span={14} flex={1}>
              <Form.Item name="anys" label={t("fields:years")}>
                <DatePicker.RangePicker
                  picker="year"
                  allowEmpty={[false, true]}
                />
              </Form.Item>
            </Col>
            <Col span={10} flex={1}>
              <Form.Item name="id_idioma" label={t("fields:language")}>
                <Select
                  showSearch
                  allowClear
                  loading={loadingIdiomes}
                  filterOption={(input, option) =>
                    !!option &&
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

export default ModalAfegirObra;
