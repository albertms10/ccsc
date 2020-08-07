import { Form } from "antd";
import { Moviment } from "model";
import moment from "moment";
import { useState } from "react";
import { useFetchAPI } from "../../../../../helpers";

export default (idObra: number) => {
  const fetchAPI = useFetchAPI();

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const postMoviment = (moviment: Moviment) => {
    setLoading(true);

    return fetchAPI(`/moviments`, () => setLoading(false), {
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
