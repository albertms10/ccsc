import { Form } from "antd";
import { useFetchAPI } from "helpers";
import { ObraPost, ItemRange } from "model";
import dayjs from "dayjs";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { fetchObres } from "store/obres/thunks";

interface FormAfegirObra {
  titol: string;
  subtitol?: string;
  anys?: ItemRange<number>;
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
          ...obra,
          anys: (obra.anys?.map((a) => a && dayjs(a).format("YYYY")) ?? [
            null,
            null,
          ]) as ItemRange<number>,
        })
      ),
    [form, postObra]
  );

  return [form, handleOk] as const;
};
