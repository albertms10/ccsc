import { Form } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import { fetchAPI } from "../../../../../helpers";
import { fetchProjectes } from "../../../../../redux/projectes/projectes-actions";

export default () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const postProjecte = (values) =>
    fetchAPI("/api/projectes", () => dispatch(fetchProjectes()), dispatch, {
      method: "POST",
      body: JSON.stringify(values),
    });

  const handleOk = () =>
    form.validateFields().then((projecte) => {
      projecte.color = projecte.color
        ? projecte.color.hex.substring(1, projecte.color.length)
        : "676767";
      projecte.data = projecte.data
        ? projecte.data.map((d) => d && moment(d).format("YYYY-MM-DD"))
        : [null, null];

      if (!projecte.agrupacions) projecte.agrupacions = [];

      return postProjecte(projecte);
    });

  return [form, handleOk];
};
