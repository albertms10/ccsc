import { Form } from "antd";
import { useFetchAPI } from "helpers";
import { Moviment } from "model";
import moment from "moment";
import { useCallback, useState } from "react";

interface FormAfegirMoviment {
  ordre?: number;
  titol_moviment: string;
  durada?: string;
}

export default (idObra: number) => {
  const fetchAPI = useFetchAPI();

  const [form] = Form.useForm<FormAfegirMoviment>();

  const [loading, setLoading] = useState(false);

  const postMoviment = useCallback(
    (moviment: Moviment) => {
      setLoading(true);

      return fetchAPI("/moviments", null, {
        method: "POST",
        body: JSON.stringify(moviment),
      }).finally(() => setLoading(false));
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
