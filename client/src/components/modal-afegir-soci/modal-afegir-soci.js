import React, { useState } from "react";
import moment from "moment";
import { Button, Form, message, Modal, Steps } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { FormAfegirSoci } from "./components/form-afegir-soci";
import "./modal-afegir-soci.css";
import { useUsername } from "./hooks";
import { upperCaseFirst } from "../../utils";
import { fetchAPI } from "../../helpers";

import { useDispatch } from "react-redux";

const { Step } = Steps;

const steps = [
  "Dades del soci",
  "Protecció de dades",
  "Drets d’imatge",
  "Resum",
];

export default ({ getSocis }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [loading, setConfirmLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [alertProteccio, setAlertProteccio] = useState(false);
  const [username, loadingUsername, getUsername] = useUsername();

  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (values.acceptaProteccioDades) {
          setConfirmLoading(true);

          values.username = username;
          values.nom = upperCaseFirst(values.nom);
          values.cognoms = upperCaseFirst(values.cognoms);
          values.acceptaDretsImatge = !!values.acceptaDretsImatge;
          values.naixement = values.naixement.format("YYYY-MM-DD");
          values.data_alta = values.data_alta
            ? values.data_alta.format("YYYY-MM-DD")
            : moment().format("YYYY-MM-DD");

          fetchAPI(
            "/api/socis",
            () => {
              setConfirmLoading(false);
              setVisible(false);
              message.success(`El soci s'ha afegit correctament.`);
              getSocis(() => {
                setCurrent(0);
                form.resetFields();
              });
            },
            dispatch,
            { method: "POST", body: JSON.stringify(values) }
          );
        } else {
          handleErrorProteccio();
        }
      })
      .catch(handleValidateError);
  };

  const handleValidateError = (error) => {
    setCurrent(0);
    console.log(error);
  };

  const handleErrorProteccio = () => {
    setCurrent(1);
    setAlertProteccio(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  // TODO És correcta aquesta funció asíncrona pel que fa a l'ús de `getUsername`?
  const handleChange = async (current) => {
    try {
      const data = await form.validateFields();

      if (current > 1 && !data.acceptaProteccioDades) {
        handleErrorProteccio();
        return;
      }

      if (current === 3) getUsername({ nom: data.nom, cognoms: data.cognoms });
    } catch (error) {
      handleValidateError(error);
      return;
    }

    setCurrent(current);
  };

  const next = async () => {
    await handleChange(current + 1);
  };

  const previous = async () => {
    await handleChange(current - 1);
  };

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Afegeix un soci
      </Button>
      <Modal
        title="Afegir soci"
        width={720}
        onCancel={handleCancel}
        visible={visible}
        footer={[
          current > 0 ? (
            <Button key="previous" onClick={previous}>
              Anterior
            </Button>
          ) : (
            ""
          ),
          current < steps.length - 1 ? (
            <Button key="next" type="primary" onClick={next}>
              Següent
            </Button>
          ) : (
            <Button
              key="ok"
              type="primary"
              onClick={handleOk}
              loading={loading}
            >
              Afegeix
            </Button>
          ),
        ]}
      >
        <Steps current={current} size="small" onChange={handleChange}>
          {steps.map((step) => (
            <Step key={step} title={step} />
          ))}
        </Steps>
        <div className="steps-content">
          <FormAfegirSoci
            form={form}
            current={current}
            username={username}
            loadingUsername={loadingUsername}
            alertProteccio={alertProteccio}
            setAlertProteccio={setAlertProteccio}
          />
        </div>
      </Modal>
    </>
  );
};
