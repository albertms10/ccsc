import { Form } from "antd";
import { DATE_FORMAT } from "constants/constants";
import dayjs from "dayjs";
import { useFetchAPI } from "helpers";
import { ItemRange, ProjectePost } from "model";
import { useCheckInicials } from "pages/tauler/projectes/components/modal-afegir-projecte/hooks/index";
import { useCallback } from "react";
import { ColorResult } from "react-color";
import { useDispatch } from "react-redux";
import { fetchProjectes } from "store/projectes/thunks";
import { initials } from "utils/strings";

interface FormAfegirProjecte {
  titol: string;
  inicials: string;
  descripcio?: string;
  color?: ColorResult;
  data?: ItemRange<string>;
  id_curs?: string;
  formacions?: number[];
}

export default () => {
  const dispatch = useDispatch();

  const fetchAPI = useFetchAPI();

  const [form] = Form.useForm<FormAfegirProjecte>();

  const [
    inicialsDisponibles,
    loadingInicials,
    checkInicials,
  ] = useCheckInicials();

  const postProjecte = useCallback(
    (projecte: ProjectePost) =>
      fetchAPI("/projectes", () => dispatch(fetchProjectes()), {
        method: "POST",
        body: JSON.stringify(projecte),
      }),
    [fetchAPI, dispatch]
  );

  const handleOk = useCallback(
    () =>
      form.validateFields().then((projecte) =>
        postProjecte({
          ...projecte,
          color:
            projecte.color?.hex.substring(1, projecte.color.hex.length) ??
            "676767",
          data: (projecte.data?.map(
            (d) => d && dayjs(d).format(DATE_FORMAT)
          ) ?? [null, null]) as ItemRange<string>,
          formacions: projecte.formacions ?? [],
        })
      ),
    [form, postProjecte]
  );

  const handleTitolChange = useCallback(
    ({ target }) => {
      const inicials = initials(target.value, {
        minValue: 3,
        maxInitials: 2,
      }).toUpperCase();

      if (inicials && form.getFieldValue("inicials") !== inicials) {
        form.setFieldsValue({ inicials });
        checkInicials(inicials);
      }
    },
    [checkInicials, form]
  );

  const validateInicialsStatus = useCallback(() => {
    const inicialsField = form.getFieldValue("inicials");

    return loadingInicials
      ? "validating"
      : inicialsField && inicialsField.inicials
      ? inicialsDisponibles
        ? "success"
        : "warning"
      : "";
  }, [form, inicialsDisponibles, loadingInicials]);

  return [
    form,
    handleOk,
    handleTitolChange,
    checkInicials,
    validateInicialsStatus,
  ] as const;
};
