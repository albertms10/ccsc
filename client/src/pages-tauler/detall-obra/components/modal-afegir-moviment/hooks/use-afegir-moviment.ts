import { Form } from "antd";
import { Moviment } from "model";
import moment from "moment";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../helpers";

export default (idObra: number) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const postMoviment = (moviment: Moviment) => {
    setLoading(true);
    return fetchAPI(`/moviments`, () => setLoading(false), dispatch, {
      method: "POST",
      body: JSON.stringify(moviment),
    });
  };

  const handleOk = () =>
    form.validateFields().then((moviment) => {
      moviment.id_obra = idObra;
      if (moviment.durada)
        moviment.durada = moment(moviment.durada).format("HH:mm:ss");
      return postMoviment(moviment as Moviment);
    });

  return [form, loading, handleOk] as const;
};
