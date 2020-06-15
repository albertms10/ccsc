import { LayoutOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import IconCorDeCambra from "./icon-cor-de-cambra";

const IconFormacio = forwardRef(({ name, hasTooltip, style }, ref) => {
  const icons = {
    "Cor de Cambra": <IconCorDeCambra ref={ref} style={style} />,
  };

  const icon = icons[name] || <LayoutOutlined ref={ref} style={style} />;

  return hasTooltip ? <Tooltip title={name}>{icon}</Tooltip> : icon;
});

IconFormacio.propTypes = {
  name: PropTypes.string.isRequired,
  hasTooltip: PropTypes.bool,
};

IconFormacio.defaultProps = {
  hasTooltip: true,
};

export default IconFormacio;
