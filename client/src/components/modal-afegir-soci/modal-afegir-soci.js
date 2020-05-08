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
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
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
        if (values.accepta_proteccio_dades) {
          setConfirmLoading(true);

          values.username = username;
          values.nom = upperCaseFirst(values.nom);
          values.cognoms = upperCaseFirst(values.cognoms);
          values.accepta_drets_imatge = !!values.accepta_drets_imatge;
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
                setCurrentPageIndex(0);
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

  const handleValidateError = (_) => {
    setCurrentPageIndex(0);
  };

  const handleErrorProteccio = () => {
    setCurrentPageIndex(1);
    setAlertProteccio(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleChange = async (pageIndex) => {
    try {
      const {
        nom,
        cognoms,
        accepta_proteccio_dades,
      } = await form.validateFields();

      if (pageIndex > 1 && !accepta_proteccio_dades) {
        handleErrorProteccio();
        return;
      }

      if (pageIndex === 3) getUsername({ nom, cognoms });
    } catch (error) {
      handleValidateError(error);
      return;
    }

    setCurrentPageIndex(pageIndex);
  };

  const next = async () => {
    await handleChange(currentPageIndex + 1);
  };

  const previous = async () => {
    await handleChange(currentPageIndex - 1);
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
          currentPageIndex > 0 ? (
            <Button key="previous" onClick={previous}>
              Anterior
            </Button>
          ) : (
            ""
          ),
          currentPageIndex < steps.length - 1 ? (
            <Button key="next" type="primary" onClick={next}>
              Següent
            </Button>
          ) : (
            <Button
              key="ok"
              type="primary"
              onClick={handleOk}
              loading={confirmLoading}
            >
              Afegeix
            </Button>
          ),
        ]}
      >
        <Steps current={currentPageIndex} size="small" onChange={handleChange}>
          {steps.map((step) => (
            <Step key={step} title={step} />
          ))}
        </Steps>
        <div className="steps-content">
          <FormAfegirSoci
            form={form}
            current={currentPageIndex}
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
