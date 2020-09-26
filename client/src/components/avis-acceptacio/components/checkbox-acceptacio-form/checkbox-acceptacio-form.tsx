import { Form } from "antd";
import { Rule } from "antd/lib/form";
import { AcceptacioAvis } from "model";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CheckboxAcceptacioItem } from "../checkbox-acceptacio-item";

interface CheckboxAcceptacioFormProps {
  acceptacio: AcceptacioAvis;
}

const CheckboxAcceptacioForm: React.FC<CheckboxAcceptacioFormProps> = ({
  acceptacio,
}) => {
  const { t } = useTranslation("validation");

  const rules = useMemo(
    (): Rule[] =>
      acceptacio.requerida
        ? [
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(t("must check")),
            },
          ]
        : [],
    [acceptacio.requerida, t]
  );

  return (
    <Form.Item
      name={["acceptacions", acceptacio.form_name]}
      valuePropName="checked"
      rules={rules}
      style={{ marginBottom: ".5rem" }}
    >
      <CheckboxAcceptacioItem acceptacio={acceptacio} />
    </Form.Item>
  );
};

export default CheckboxAcceptacioForm;
