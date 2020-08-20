import { Form } from "antd";
import { DATE_FORMAT } from "constants/constants";
import { useFetchAPI } from "helpers";
import { Projecte } from "model";
import moment from "moment";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { fetchProjectes } from "store/projectes/thunks";

export default () => {
  const dispatch = useDispatch();

  const fetchAPI = useFetchAPI();

  const [form] = Form.useForm();

  const postProjecte = useCallback(
    (projecte: Projecte) =>
      fetchAPI("/projectes", () => dispatch(fetchProjectes()), {
        method: "POST",
        body: JSON.stringify(projecte),
      }),
    [fetchAPI, dispatch]
  );

  const handleOk = useCallback(
    () =>
      form.validateFields().then((projecte) => {
        projecte.color = projecte.color
          ? projecte.color.hex.substring(1, projecte.color.length)
          : "676767";
        projecte.data = projecte.data
          ? projecte.data.map((d: string) => d && moment(d).format(DATE_FORMAT))
          : [null, null];

        if (!projecte.formacions) projecte.formacions = [];

        return postProjecte(projecte as Projecte);
      }),
    [form, postProjecte]
  );

  return [form, handleOk] as const;
};
