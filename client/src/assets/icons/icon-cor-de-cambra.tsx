import Icon from "@ant-design/icons";
import React, { forwardRef } from "react";
import { StyledComponent } from "react-types";
import { ReactComponent as SVGIconCorDeCambra } from "../svg/icon-cor-de-cambra.svg";

type IconCorDeCambraProps = StyledComponent;

const IconCorDeCambra = forwardRef<HTMLButtonElement, IconCorDeCambraProps>(
  (props, ref) => <Icon {...props} ref={ref} component={SVGIconCorDeCambra} />
);

IconCorDeCambra.displayName = "IconCorDeCambra";

export default IconCorDeCambra;
