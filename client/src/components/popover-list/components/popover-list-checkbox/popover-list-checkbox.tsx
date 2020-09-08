import { Badge, Checkbox, List } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React from "react";

export interface PopoverListCheckboxBaseProps {
  onChange: (e: CheckboxChangeEvent) => void;
}

interface PopoverListCheckboxProps extends PopoverListCheckboxBaseProps {
  label: string;
  value: string;
  status?: "success" | "processing" | "error" | "default" | "warning";
}

const PopoverListCheckbox: React.FC<PopoverListCheckboxProps> = ({
  label,
  value = label,
  status,
  onChange,
}) => (
  <List.Item extra={<Badge status={status} />}>
    <Checkbox key={value} value={value} defaultChecked onChange={onChange}>
      {label}
    </Checkbox>
  </List.Item>
);

export default PopoverListCheckbox;
