import { Form, message } from "antd";
import moment from "moment";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../helpers";
import { upperCaseFirst } from "../../../../utils";
import { useUsername } from "./";

export default () => {
  const dispatch = useDispatch();

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [alertProteccio, setAlertProteccio] = useState(false);
  const [username, loadingUsername, getUsername] = useUsername();

  const [form] = Form.useForm();

  const handleOk = (callback) => {
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
              message.success(`El soci s'ha afegit correctament.`);
              if (typeof callback === "function") callback();
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

  const handleValidateError = (_) => setCurrentPageIndex(0);

  const handleErrorProteccio = () => {
    setCurrentPageIndex(1);
    setAlertProteccio(true);
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

  const next = async () => await handleChange(currentPageIndex + 1);

  const previous = async () => await handleChange(currentPageIndex - 1);

  return {
    form,
    handleOk,
    handleChange,
    currentPageIndex,
    setCurrentPageIndex,
    confirmLoading,
    alertProteccio,
    setAlertProteccio,
    username,
    loadingUsername,
    next,
    previous,
  };
};
