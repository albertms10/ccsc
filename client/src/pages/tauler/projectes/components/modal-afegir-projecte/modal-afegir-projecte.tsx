import {
  blue,
  cyan,
  geekblue,
  gold,
  green,
  grey,
  lime,
  magenta,
  purple,
  red,
  volcano,
  yellow,
} from "@ant-design/colors";
import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import { ModalButton } from "components/modal-button";
import { TagSelectFormItemFormacions } from "components/tag-select-form-item-formacions";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useAPI } from "helpers";
import { Curs } from "model";
import React, { useState } from "react";
import { CirclePicker, ColorResult } from "react-color";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "store/types";
import { useAfegirProjecte } from "./hooks";

dayjs.extend(isBetween);

const { Option } = Select;

const ModalAfegirProjecte: React.FC = () => {
  const { t } = useTranslation(["validation", "fields"]);

  const { loading } = useSelector(({ projectes }: RootState) => projectes);

  const [color, setColor] = useState({} as ColorResult);

  const [cursos, loadingCursos] = useAPI<Curs[]>("/entitats/cursos", []);

  const [
    form,
    handleOk,
    handleTitolChange,
    checkInicials,
    validateInicialsStatus,
  ] = useAfegirProjecte();

  return (
    <ModalButton
      title={t("actions:add project")}
      confirmLoading={loading}
      onOk={(setVisible) => {
        handleOk().then(() => {
          setVisible(false);
          form.resetFields();
        });
      }}
      forceRender
      renderModalBody={() => (
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col sm={16} md={20}>
              <Form.Item
                name="titol"
                label={t("fields:title")}
                rules={[{ required: true, message: t("enter title") }]}
              >
                <Input onChange={handleTitolChange} />
              </Form.Item>
            </Col>
            <Col sm={8} md={4}>
              <Form.Item
                name="inicials"
                label={t("fields:initials")}
                validateStatus={validateInicialsStatus()}
                hasFeedback
                rules={[{ required: true, message: t("enter initials") }]}
              >
                <Input onChange={({ target }) => checkInicials(target.value)} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="descripcio" label={t("fields:short description")}>
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item name="color">
            <CirclePicker
              color={color.hex}
              onChangeComplete={setColor}
              colors={[
                red,
                volcano,
                gold,
                yellow,
                lime,
                green,
                cyan,
                blue,
                geekblue,
                purple,
                magenta,
                grey,
              ].map((color) => color.primary as string)}
            />
          </Form.Item>
          <Row gutter={16}>
            <Col sm={24} md={16} flex={1}>
              <Form.Item name="data" label={t("fields:date")}>
                <DatePicker.RangePicker
                  format="L"
                  allowEmpty={[false, true]}
                  // @ts-ignore
                  onChange={([data_inici]) => {
                    const curs = cursos.find((curs) =>
                      dayjs(data_inici as Dayjs).isBetween(
                        dayjs(curs.inici),
                        dayjs(curs.final)
                      )
                    );
                    if (curs) form.setFieldsValue({ id_curs: curs.id_curs });
                  }}
                />
              </Form.Item>
            </Col>
            <Col sm={24} md={8} flex={1}>
              <Form.Item
                name="id_curs"
                label={t("fields:school year")}
                rules={[{ required: true, message: t("enter school year") }]}
              >
                <Select
                  showSearch
                  loading={loadingCursos}
                  filterOption={(input, option) =>
                    !!option &&
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {cursos.map((curs) => (
                    <Option key={curs.id_curs} value={curs.id_curs}>
                      {dayjs(curs.inici).format("YYYY")}–
                      {dayjs(curs.final).format("YY")}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <TagSelectFormItemFormacions />
        </Form>
      )}
    />
  );
};

export default ModalAfegirProjecte;
