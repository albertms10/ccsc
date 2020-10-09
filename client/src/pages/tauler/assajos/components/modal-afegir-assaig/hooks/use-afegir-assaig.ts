import { Form } from "antd";
import { DATE_FORMAT } from "constants/constants";
import { useFetchAPI } from "helpers";
import { AssaigPost } from "model";
import dayjs from "dayjs";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { fetchAssajos } from "store/assajos/thunks";

interface FormAfegirAssaig {
  data: string;
  hora?: [inici: string, final: string | null];
  es_general?: boolean;
  es_extra?: boolean;
  formacions?: number[];
}

export default () => {
  const dispatch = useDispatch();

  const fetchAPI = useFetchAPI();

  const [form] = Form.useForm<FormAfegirAssaig>();

  const postAssaig = useCallback(
    (assaig: AssaigPost) =>
      fetchAPI("/assajos", () => dispatch(fetchAssajos()), {
        method: "POST",
        body: JSON.stringify(assaig),
      }),
    [fetchAPI, dispatch]
  );

  const handleOk = useCallback(
    (idProjecte?: number) =>
      form.validateFields().then((assaig) =>
        postAssaig({
          ...(assaig as AssaigPost),
          data: dayjs(assaig.data).format(DATE_FORMAT),
          hora: assaig.hora?.map(
            (h: string) => h && dayjs(h).format("HH:mm")
          ) ?? [null, null],
          projectes: idProjecte ? [idProjecte] : [],
          formacions: assaig.formacions ?? [],
          es_general: !!assaig.es_general,
          es_extra: !!assaig.es_extra,
        })
      ),
    [form, postAssaig]
  );

  return [form, handleOk] as const;
};
