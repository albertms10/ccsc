import { Form } from "antd";
import { useFetchAPI } from "helpers";
import { Moviment } from "model";
import dayjs from "dayjs";
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
      form.validateFields().then((moviment) =>
        postMoviment({
          ...(moviment as Moviment),
          id_obra: idObra,
          durada: moviment.durada
            ? dayjs(moviment.durada).format("HH:mm:ss")
            : undefined,
        })
      ),
    [form, idObra, postMoviment]
  );

  return [form, loading, handleOk] as const;
};
