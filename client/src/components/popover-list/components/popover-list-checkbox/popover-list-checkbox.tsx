import { Checkbox, List } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React from "react";

export interface PopoverListCheckboxBaseProps {
  onChange: (e: CheckboxChangeEvent) => void;
}

interface PopoverListCheckboxProps extends PopoverListCheckboxBaseProps {
  label: string;
  value: string;
}

const PopoverListCheckbox: React.FC<PopoverListCheckboxProps> = ({
  label,
  value = label,
  onChange,
}) => (
  <List.Item>
    <Checkbox key={value} value={value} defaultChecked onChange={onChange}>
      {label}
    </Checkbox>
  </List.Item>
);

export default PopoverListCheckbox;
