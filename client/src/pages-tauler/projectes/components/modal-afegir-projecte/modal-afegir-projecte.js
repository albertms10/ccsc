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
import { PlusOutlined } from "@ant-design/icons";
import TagSelect from "ant-design-pro/lib/TagSelect";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import React, { useContext, useState } from "react";
import { CirclePicker } from "react-color";
import { useSelector } from "react-redux";
import { IconAgrupacio } from "../../../../assets/icons";
import { AgrupacionsListContext } from "../../../../components/tauler-app/contexts/agrupacions-context";
import { initials } from "../../../../utils";
import { useAfegirProjecte, useCursos } from "./hooks";

const { Option } = Select;

export default () => {
  const agrupacions = useContext(AgrupacionsListContext);
  const { loading } = useSelector(({ projectes }) => projectes);

  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState({});

  const [form, handleOk] = useAfegirProjecte();
  const [cursos, loadingCursos] = useCursos();

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setVisible(true)}
      >
        Afegeix un projecte
      </Button>
      <Modal
        title="Afegir projecte"
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
          <Row gutter={16}>
            <Col sm={16} md={20}>
              <Form.Item
                name="titol"
                label="Títol"
                rules={[{ required: true, message: "Introdueix el títol" }]}
              >
                <Input
                  onChange={({ target }) =>
                    (document.getElementById("inicials").value = initials(
                      target.value,
                      {
                        minValue: 3,
                        maxInitials: 3,
                      }
                    ).toUpperCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col sm={8} md={4}>
              <Form.Item name="inicials" label="Inicials">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="descripcio" label="Breu descripció">
            <TextArea autoSize />
          </Form.Item>
          <Form.Item name="color">
            <CirclePicker
              color={color}
              onChangeComplete={setColor}
              colors={[
                red.primary,
                volcano.primary,
                gold.primary,
                yellow.primary,
                lime.primary,
                green.primary,
                cyan.primary,
                blue.primary,
                geekblue.primary,
                purple.primary,
                magenta.primary,
                grey.primary,
              ]}
            />
          </Form.Item>
          <Row gutter={16} type="flex">
            <Col sm={24} md={16} flex={1}>
              <Form.Item name="data" label="Data">
                <DatePicker.RangePicker format="L" allowEmpty={[false, true]} />
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
          <Form.Item name="agrupacions" label="Agrupacions">
            <TagSelect className="" Option={null} hideCheckAll>
              {agrupacions.map((agrupacio) => (
                <TagSelect.Option
                  key={agrupacio.id_agrupacio}
                  value={agrupacio.id_agrupacio}
                >
                  <Space>
                    <IconAgrupacio name={agrupacio.nom_curt} />
                    {agrupacio.nom_curt}
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
