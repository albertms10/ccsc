import { Checkbox, Typography } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { AcceptacioPropTypes } from "../../../../typedef/prop-types";
import "./checkbox-acceptacio-item.css";

const { Paragraph } = Typography;

const CheckboxAcceptacioItem = ({ acceptacio, ...props }) => (
  <Checkbox {...props}>
    <div style={{ display: "inline-grid" }}>
      <Paragraph style={{ marginBottom: 0 }}>{acceptacio.titol}</Paragraph>
      <Paragraph type="secondary">
        {acceptacio.descripcio}
        {acceptacio.descripcio && acceptacio.requerida ? " —\u00a0" : ""}
        {acceptacio.requerida ? "Requerida" : ""}
      </Paragraph>
    </div>
  </Checkbox>
);

CheckboxAcceptacioItem.propTypes = {
  acceptacio: AcceptacioPropTypes.isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default CheckboxAcceptacioItem;
