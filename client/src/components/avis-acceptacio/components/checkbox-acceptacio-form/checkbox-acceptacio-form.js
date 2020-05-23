import { Form } from "antd";
import React from "react";
import { AcceptacioPropTypes } from "../../../../typedef/prop-types";
import { CheckboxAcceptacioItem } from "../checkbox-acceptacio-item";

const CheckboxAcceptacioForm = ({ acceptacio }) => (
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

CheckboxAcceptacioForm.propTypes = {
  acceptacio: AcceptacioPropTypes.isRequired,
};

CheckboxAcceptacioForm.defaultTypes = {
  acceptacio: {},
};

export default CheckboxAcceptacioForm;
