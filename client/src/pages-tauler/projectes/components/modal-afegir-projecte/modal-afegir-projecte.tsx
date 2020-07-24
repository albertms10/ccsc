import * as colors from "@ant-design/colors";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Curs } from "model";
import moment from "moment";
import React, { useCallback, useState } from "react";
import { CirclePicker, ColorResult } from "react-color";
import { useSelector } from "react-redux";
import { ModalButton } from "../../../../components/modal-button";
import { TagSelectFormItemFormacions } from "../../../../components/tag-select-form-item-formacions";
import { useAPI } from "../../../../helpers";
import { RootState } from "../../../../store/types";
import { initials } from "../../../../utils";
import { useAfegirProjecte, useCheckInicials } from "./hooks";

const { Option } = Select;

const ModalAfegirProjecte: React.FC = () => {
  const { loading } = useSelector(({ projectes }: RootState) => projectes);

  const [color, setColor] = useState<ColorResult>({} as ColorResult);

  const [form, handleOk] = useAfegirProjecte();

  const [
    inicialsDisponibles,
    loadingInicials,
    checkInicials,
  ] = useCheckInicials();

  const [cursos, loadingCursos] = useAPI<Curs[]>("/agrupacions/cursos", []);

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
      button={
        <Button type="primary" icon={<PlusOutlined />}>
          Afegeix un projecte
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
            <TextArea autoSize />
          </Form.Item>
          <Form.Item name="color">
            <CirclePicker
              color={color.hex}
              onChangeComplete={setColor}
              colors={[
                colors.red.primary as string,
                colors.volcano.primary as string,
                colors.gold.primary as string,
                colors.yellow.primary as string,
                colors.lime.primary as string,
                colors.green.primary as string,
                colors.cyan.primary as string,
                colors.blue.primary as string,
                colors.geekblue.primary as string,
                colors.purple.primary as string,
                colors.magenta.primary as string,
                colors.grey.primary as string,
              ]}
            />
          </Form.Item>
          <Row gutter={16}>
            <Col sm={24} md={16} flex={1}>
              <Form.Item name="data" label="Data">
                <DatePicker.RangePicker
                  format="L"
                  allowEmpty={[false, true]}
                  onChange={(moments) => {
                    const curs = cursos.find((curs) =>
                      // TODO: Esperar que es corregeixi el tipat d’antd
                      // @ts-ignore
                      moment(moments[0]).isBetween(
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
                    option!.children
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
