import { Form } from "antd";
import { Assaig } from "model";
import moment from "moment";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { DATE_FORMAT } from "../../../../../constants/constants";
import { useFetchAPI } from "../../../../../helpers";
import { fetchAssajos } from "../../../../../store/assajos/thunks";

export default () => {
  const dispatch = useDispatch();

  const fetchAPI = useFetchAPI();

  const [form] = Form.useForm();

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
        if (!assaig.formacions) assaig.formacions = [];

        return postAssaig(assaig as Assaig);
      }),
    [form, postAssaig]
  );

  return [form, handleOk] as const;
};
