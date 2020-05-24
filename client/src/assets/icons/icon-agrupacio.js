import { LayoutOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import React from "react";
import IconCorDeCambra from "./icon-cor-de-cambra";

const IconAgrupacio = ({ name, style }) => {
  const icons = {
    "Cor de Cambra": <IconCorDeCambra style={style} />,
  };

  return icons[name] || <LayoutOutlined style={style} />;
};

IconAgrupacio.propTypes = {
  name: PropTypes.string.isRequired,
};

export default IconAgrupacio;
