import { Button, Form, message, Space } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../helpers";
import { upperCaseFirst } from "../../../utils";
import { useUsername } from "./index";

const steps = [
  "Protecció de dades",
  "Dades del soci",
  "Drets d’imatge",
  "Resum",
];

export default (onSuccessCallback, fetchURL = "/api/socis") => {
  const dispatch = useDispatch();

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [acceptaDretsImatge, setAcceptaDretsImatge] = useState(false);
  const [username, loadingUsername, getUsername] = useUsername();

  const [form] = Form.useForm();

  const handleOk = (callback) => {
    form
      .validateFields()
      .then((values) => {
        setConfirmLoading(true);

        values.username = username;
        values.nom = upperCaseFirst(values.nom);
        values.cognoms = upperCaseFirst(values.cognoms);
        values.accepta_proteccio_dades = true;
        values.accepta_drets_imatge = acceptaDretsImatge;
        values.naixement = values.naixement.format("YYYY-MM-DD");
        values.data_alta = values.data_alta
          ? values.data_alta.format("YYYY-MM-DD")
          : moment().format("YYYY-MM-DD");

        fetchAPI(
          fetchURL,
          () => {
            setConfirmLoading(false);
            message.success(`El soci s'ha afegit correctament.`);
            if (typeof callback === "function") callback();
          },
          dispatch,
          { method: "POST", body: JSON.stringify(values) }
        );
      })
      .catch(handleValidateError);
  };

  const handleValidateError = (_) => setCurrentPageIndex(1);

  const handleChange = async (pageIndex) => {
    if (pageIndex > 1)
      try {
        const { nom, cognoms } = await form.validateFields();

        if (pageIndex === 3) getUsername({ nom, cognoms });
      } catch (error) {
        handleValidateError(error);
        return;
      }

    setCurrentPageIndex(pageIndex);
  };

  const next = async () => await handleChange(currentPageIndex + 1);

  const previous = async () => await handleChange(currentPageIndex - 1);

  const footerActions = [
    <div key="footer" style={{ display: "flex" }}>
      <div style={{ flex: 1, textAlign: "start" }}>
        {currentPageIndex > 0 ? (
          <Button key="previous" onClick={previous}>
            Anterior
          </Button>
        ) : (
          ""
        )}
      </div>
      <Space>
        {currentPageIndex === 2 ? (
          <Button
            key="next"
            onClick={() => next().then(() => setAcceptaDretsImatge(false))}
          >
            No accepto
          </Button>
        ) : (
          ""
        )}
        {currentPageIndex < steps.length - 1 ? (
          <Button
            key="next"
            type="primary"
            onClick={() => next().then(() => setAcceptaDretsImatge(true))}
          >
            {currentPageIndex === 0 || currentPageIndex === 2
              ? "Ho he llegit i dono el meu consentiment"
              : "Següent"}
          </Button>
        ) : (
          <Button
            key="ok"
            type="primary"
            onClick={() => handleOk(onSuccessCallback)}
            loading={confirmLoading}
          >
            Afegeix
          </Button>
        )}
      </Space>
    </div>,
  ];

  return {
    steps,
    form,
    footerActions,
    handleChange,
    currentPageIndex,
    setCurrentPageIndex,
    username,
    loadingUsername,
    acceptaDretsImatge,
  };
};
