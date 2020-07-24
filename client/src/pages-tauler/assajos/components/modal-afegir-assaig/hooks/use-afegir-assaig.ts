import { Form } from "antd";
import { Assaig } from "model";
import moment from "moment";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../helpers";
import { fetchAssajos } from "../../../../../store/assajos/thunks";

export default () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const postAssaig = (assaig: Assaig) =>
    fetchAPI("/assajos", () => dispatch(fetchAssajos()), dispatch, {
      method: "POST",
      body: JSON.stringify({ assaig }),
    });

  const handleOk = (idProjecte?: number) =>
    form.validateFields().then((assaig) => {
      assaig.dia_inici = moment(assaig.dia_inici).format("YYYY-MM-DD");
      assaig.hora = assaig.hora
        ? assaig.hora.map((h: string) => h && moment(h).format("HH:mm"))
        : [null, null];
      assaig.projectes = idProjecte ? [idProjecte] : [];
      if (!assaig.formacions) assaig.formacions = [];

      return postAssaig(assaig as Assaig);
    });

  return [form, handleOk] as const;
};
