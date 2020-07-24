import { LayoutOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { forwardRef } from "react";
import { StyledComponent } from "react-types";
import IconCorDeCambra from "./icon-cor-de-cambra";

interface IconFormacioProps extends StyledComponent {
  name: string;
  hasTooltip?: boolean;
}

type IconObject = {
  [key: string]: JSX.Element;
};

const IconFormacio = forwardRef<HTMLButtonElement, IconFormacioProps>(
  ({ name, hasTooltip = true, style }, ref) => {
    const icons: IconObject = {
      "Cor de Cambra": <IconCorDeCambra ref={ref} style={style} />,
    };

    const icon = icons[name] || <LayoutOutlined ref={ref} style={style} />;

    return hasTooltip ? <Tooltip title={name}>{icon}</Tooltip> : icon;
  }
);

export default IconFormacio;
