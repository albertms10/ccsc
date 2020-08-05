import { Form } from "antd";
import { AcceptacioAvis } from "model";
import React from "react";
import { useTranslation } from "react-i18next";
import { CheckboxAcceptacioItem } from "../checkbox-acceptacio-item";

interface CheckboxAcceptacioFormProps {
  acceptacio: AcceptacioAvis;
}

const CheckboxAcceptacioForm: React.FC<CheckboxAcceptacioFormProps> = ({
  acceptacio,
}) => {
  const { t } = useTranslation("validation");

  return (
    <Form.Item
      name={["acceptacions", acceptacio.form_name]}
      valuePropName="checked"
      rules={
        acceptacio.requerida
          ? [
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(t("must check")),
              },
            ]
          : []
      }
      style={{ marginBottom: ".5rem" }}
    >
      <CheckboxAcceptacioItem acceptacio={acceptacio} />
    </Form.Item>
  );
};

export default CheckboxAcceptacioForm;
