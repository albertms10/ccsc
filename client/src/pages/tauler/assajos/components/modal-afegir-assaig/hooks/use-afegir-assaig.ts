import { Form } from "antd";
import { DATE_FORMAT } from "constants/constants";
import { useFetchAPI } from "helpers";
import { Assaig } from "model";
import moment from "moment";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { fetchAssajos } from "store/assajos/thunks";

interface FormAfegirAssaig {
  dia_inici: string;
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
    (assaig: Assaig) =>
      fetchAPI("/assajos", () => dispatch(fetchAssajos()), {
        method: "POST",
        body: JSON.stringify(assaig),
      }),
    [fetchAPI, dispatch]
  );

  const handleOk = useCallback(
    (idProjecte?: number) =>
      form.validateFields().then((assaig) => {
        assaig.dia_inici = moment(assaig.dia_inici).format(DATE_FORMAT);
        assaig.hora = assaig.hora
          ? assaig.hora.map((h: string) => h && moment(h).format("HH:mm"))
          : [null, null];
        assaig.projectes = idProjecte ? [idProjecte] : [];
        assaig.es_general = !!assaig.es_general;
        assaig.es_extra = !!assaig.es_extra;

        if (!assaig.formacions) assaig.formacions = [];

        return postAssaig(assaig as Assaig);
      }),
    [form, postAssaig]
  );

  return [form, handleOk] as const;
};
