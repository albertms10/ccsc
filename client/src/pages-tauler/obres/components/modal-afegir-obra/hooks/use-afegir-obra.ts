import { Form } from "antd";
import { Obra } from "model";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useFetchAPI } from "../../../../../helpers";
import { fetchObres } from "../../../../../store/obres/thunks";

export default () => {
  const dispatch = useDispatch();

  const fetchAPI = useFetchAPI();

  const [form] = Form.useForm();

  const postObra = (obra: Obra) =>
    fetchAPI("/obres", () => dispatch(fetchObres()), {
      method: "POST",
      body: JSON.stringify(obra),
    });

  const handleOk = () =>
    form.validateFields().then((obra) => {
      obra.anys = obra.anys
        ? obra.anys.map((a: string) => a && moment(a).format("YYYY"))
        : [null, null];

      return postObra(obra as Obra);
    });

  return [form, handleOk] as const;
};
