import { Form } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../helpers";
import { fetchObres } from "../../../../../redux/obres/obres-actions";

export default () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const postObra = (obra) =>
    fetchAPI("/api/obres", () => dispatch(fetchObres()), dispatch, {
      method: "POST",
      body: JSON.stringify({ obra }),
    });

  const handleOk = () =>
    form.validateFields().then((obra) => {
      obra.anys = obra.anys
        ? obra.anys.map((a) => a && moment(a).format("YYYY"))
        : [null, null];

      return postObra(obra);
    });

  return [form, handleOk];
};
