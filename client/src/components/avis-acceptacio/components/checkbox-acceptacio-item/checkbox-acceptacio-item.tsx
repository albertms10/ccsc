import { Checkbox, Typography } from "antd";
import { CheckboxProps } from "antd/lib/checkbox";
import { AcceptacioAvis } from "model";
import React from "react";
import "./checkbox-acceptacio-item.css";

const { Paragraph } = Typography;

interface CheckboxAcceptacioItemProps extends CheckboxProps {
  acceptacio: AcceptacioAvis;
}

const CheckboxAcceptacioItem: React.FC<CheckboxAcceptacioItemProps> = ({
  acceptacio,
  ...props
}) => (
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

export default CheckboxAcceptacioItem;
