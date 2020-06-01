import { Form } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../helpers";
import { fetchAssajos } from "../../../../../redux/assajos/assajos-actions";

export default () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const postAssaig = (values) =>
    fetchAPI("/api/assajos", () => dispatch(fetchAssajos()), dispatch, {
      method: "POST",
      body: JSON.stringify(values),
    });

  const handleOk = () =>
    form
      .validateFields()
      .then((assaig) => {
        assaig.dia_inici = moment(assaig.dia_inici).format("YYYY-MM-DD");
        assaig.hora = assaig.hora
          ? assaig.hora.map((h) => h && moment(h).format("HH:mm"))
          : [null, null];
        if (!assaig.agrupacions) assaig.agrupacions = [];

        return postAssaig(assaig);
      })

  return [form, handleOk];
};
