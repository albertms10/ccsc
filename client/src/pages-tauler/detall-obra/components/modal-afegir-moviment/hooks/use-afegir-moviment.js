import { Form } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../helpers";
import moment from "moment";

export default (idObra) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const postMoviment = (moviment) => {
    setLoading(true);
    fetchAPI(
      `/api/obres/${idObra}/moviments`,
      () => setLoading(false),
      dispatch,
      {
        method: "POST",
        body: JSON.stringify({ moviment }),
      }
    );
  };

  const handleOk = () =>
    form.validateFields().then((moviment) => {
      moviment.durada = moment(moviment.durada).format("HH:mm:ss");
      return postMoviment(moviment);
    });

  return [form, loading, handleOk];
};
