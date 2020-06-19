import { Checkbox, List } from "antd";
import PropTypes from "prop-types";
import React from "react";

const PopoverListCheckbox = ({ label, value = label, onChange }) => (
  <List.Item>
    <Checkbox
      key={value}
      value={value}
      defaultChecked={true}
      onChange={onChange}
    >
      {label}
    </Checkbox>
  </List.Item>
);

PopoverListCheckbox.propTypes = {
  label: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

export default PopoverListCheckbox;
