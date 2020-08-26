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
import { useAPI } from "helpers";
import { Curs } from "model";
import moment from "moment";
import React, { useCallback, useState } from "react";
import { CirclePicker, ColorResult } from "react-color";
import { useSelector } from "react-redux";
import { RootState } from "store/types";
import { initials } from "utils";
import { useAfegirProjecte, useCheckInicials } from "./hooks";

const { Option } = Select;

const ModalAfegirProjecte: React.FC = () => {
  const { loading } = useSelector(({ projectes }: RootState) => projectes);

  const [color, setColor] = useState({} as ColorResult);

  const [form, handleOk] = useAfegirProjecte();

  const [
    inicialsDisponibles,
    loadingInicials,
    checkInicials,
  ] = useCheckInicials();

  const [cursos, loadingCursos] = useAPI<Curs[]>("/entitats/cursos", []);

  const handleTitolChange = useCallback(
    ({ target }) => {
      const inicials = initials(target.value, {
        minValue: 3,
        maxInitials: 2,
      }).toUpperCase();

      if (inicials && form.getFieldValue("inicials") !== inicials) {
        form.setFieldsValue({ inicials });
        checkInicials(inicials);
      }
    },
    [checkInicials, form]
  );

  return (
    <ModalButton
      title="Afegir projecte"
      confirmLoading={loading}
      onOk={(setVisible) => {
        handleOk().then(() => {
          setVisible(false);
          form.resetFields();
        });
      }}
      renderModalBody={() => (
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col sm={16} md={20}>
              <Form.Item
                name="titol"
                label="Títol"
                rules={[{ required: true, message: "Introdueix el títol" }]}
              >
                <Input onChange={handleTitolChange} />
              </Form.Item>
            </Col>
            <Col sm={8} md={4}>
              <Form.Item
                name="inicials"
                label="Inicials"
                validateStatus={
                  loadingInicials
                    ? "validating"
                    : form.getFieldsValue(["inicials"]).inicials
                    ? inicialsDisponibles
                      ? "success"
                      : "warning"
                    : ""
                }
                hasFeedback
                rules={[{ required: true, message: "Introdueix les inicials" }]}
              >
                <Input onChange={({ target }) => checkInicials(target.value)} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="descripcio" label="Breu descripció">
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
              <Form.Item name="data" label="Data">
                <DatePicker.RangePicker
                  format="L"
                  allowEmpty={[false, true]}
                  onChange={([data_inici]) => {
                    const curs = cursos.find((curs) =>
                      moment(data_inici).isBetween(
                        moment(curs.inici),
                        moment(curs.final)
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
                label="Curs"
                rules={[{ required: true, message: "Introdueix el curs" }]}
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
                      {moment(curs.inici).format("YYYY")}–
                      {moment(curs.final).format("YY")}
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