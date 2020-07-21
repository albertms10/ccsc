import { Form } from "antd";
import { AcceptacioAvis } from "model";
import React from "react";
import { CheckboxAcceptacioItem } from "../checkbox-acceptacio-item";

interface CheckboxAcceptacioFormProps {
  acceptacio: AcceptacioAvis;
}

const CheckboxAcceptacioForm: React.FC<CheckboxAcceptacioFormProps> = ({
  acceptacio,
}) => (
  <Form.Item
    name={["acceptacions", acceptacio.form_name]}
    valuePropName="checked"
    rules={
      acceptacio.requerida
        ? [
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject("Has de marcar la casella"),
            },
          ]
        : []
    }
    style={{ marginBottom: ".5rem" }}
  >
    <CheckboxAcceptacioItem acceptacio={acceptacio} />
  </Form.Item>
);

export default CheckboxAcceptacioForm;
