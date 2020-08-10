import { Form } from "antd";
import { Obra } from "model";
import moment from "moment";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useFetchAPI } from "../../../../../helpers";
import { fetchObres } from "../../../../../store/obres/thunks";

export default () => {
  const dispatch = useDispatch();

  const fetchAPI = useFetchAPI();

  const [form] = Form.useForm();

  const postObra = useCallback(
    (obra: Obra) =>
      fetchAPI("/obres", () => dispatch(fetchObres()), {
        method: "POST",
        body: JSON.stringify(obra),
      }),
    [fetchAPI, dispatch]
  );

  const handleOk = useCallback(
    () =>
      form.validateFields().then((obra) => {
        obra.anys = obra.anys
          ? obra.anys.map((a: string) => a && moment(a).format("YYYY"))
          : [null, null];

        return postObra(obra as Obra);
      }),
    [form, postObra]
  );

  return [form, handleOk] as const;
};
