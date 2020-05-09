import { LayoutOutlined } from "@ant-design/icons";
import React from "react";
import IconCorDeCambra from "./icon-cor-de-cambra";

export default ({ name, style }) => {
  const icons = {
    "Cor de Cambra": <IconCorDeCambra style={style} />,
  };

  return icons[name] || <LayoutOutlined style={style} />;
};
