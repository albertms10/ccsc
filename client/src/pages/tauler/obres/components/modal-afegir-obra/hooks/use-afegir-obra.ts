import { Form } from "antd";
import { useFetchAPI } from "helpers";
import { ObraPost } from "model";
import moment from "moment";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { fetchObres } from "store/obres/thunks";

interface FormAfegirObra {
  titol: string;
  subtitol?: string;
  anys?: [inici: string, final: string | null];
  id_idioma?: number;
}

export default () => {
  const dispatch = useDispatch();

  const fetchAPI = useFetchAPI();

  const [form] = Form.useForm<FormAfegirObra>();

  const postObra = useCallback(
    (obra: ObraPost) =>
      fetchAPI("/obres", () => dispatch(fetchObres()), {
        method: "POST",
        body: JSON.stringify(obra),
      }),
    [fetchAPI, dispatch]
  );

  const handleOk = useCallback(
    () =>
      form.validateFields().then((obra) =>
        postObra({
          ...(obra as ObraPost),
          anys: obra.anys?.map(
            (a: string) => a && moment(a).format("YYYY")
          ) ?? [null, null],
        })
      ),
    [form, postObra]
  );

  return [form, handleOk] as const;
};
