import { Form } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../helpers";

export default () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const postAssaig = (values) => {
    fetchAPI("/api/assajos", () => null, dispatch, {
      method: "POST",
      body: JSON.stringify(values),
    });
  };

  const handleOk = () => {
    form.validateFields().then((assaig) => {
      assaig.dia_inici = moment(assaig.dia_inici).format("YYYY-MM-DD");
      assaig.hora = assaig.hora
        ? assaig.hora.map((h) => h && moment(h).format("HH:mm"))
        : [null, null];

      postAssaig(assaig);
    });
  };

  return [form, handleOk];
};
