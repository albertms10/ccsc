import { Form } from "antd";
import { Projecte } from "model";
import moment from "moment";
import { useDispatch } from "react-redux";
import { DATE_FORMAT } from "../../../../../constants/constants";
import { fetchAPI } from "../../../../../helpers";
import { fetchProjectes } from "../../../../../store/projectes/thunks";

export default () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const postProjecte = (projecte: Projecte) =>
    fetchAPI("/projectes", () => dispatch(fetchProjectes()), dispatch, {
      method: "POST",
      body: JSON.stringify(projecte),
    });

  const handleOk = () =>
    form.validateFields().then((projecte) => {
      projecte.color = projecte.color
        ? projecte.color.hex.substring(1, projecte.color.length)
        : "676767";
      projecte.data = projecte.data
        ? projecte.data.map((d: string) => d && moment(d).format(DATE_FORMAT))
        : [null, null];

      if (!projecte.formacions) projecte.formacions = [];

      return postProjecte(projecte as Projecte);
    });

  return [form, handleOk] as const;
};
