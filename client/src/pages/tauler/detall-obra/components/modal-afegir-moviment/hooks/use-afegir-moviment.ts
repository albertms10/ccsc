import { Form } from "antd";
import { useFetchAPI } from "helpers";
import { Moviment } from "model";
import moment from "moment";
import { useCallback, useState } from "react";

export default (idObra: number) => {
  const fetchAPI = useFetchAPI();

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const postMoviment = useCallback(
    (moviment: Moviment) => {
      setLoading(true);

      return fetchAPI("/moviments", () => setLoading(false), {
        method: "POST",
        body: JSON.stringify(moviment),
      });
    },
    [fetchAPI]
  );

  const handleOk = useCallback(
    () =>
      form.validateFields().then((moviment) => {
        moviment.id_obra = idObra;

        if (moviment.durada)
          moviment.durada = moment(moviment.durada).format("HH:mm:ss");

        return postMoviment(moviment as Moviment);
      }),
    [form, idObra, postMoviment]
  );

  return [form, loading, handleOk] as const;
};
