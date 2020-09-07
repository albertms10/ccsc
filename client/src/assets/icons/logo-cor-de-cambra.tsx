import Icon from "@ant-design/icons";
import React from "react";
import { StyledComponent } from "react-types";
import { ReactComponent as SVGLogoCorDeCambra } from "../svg/logo-cor-de-cambra.svg";

interface LogoCorDeCambraProps extends StyledComponent {
  className?: string;
}

const LogoCorDeCambra: React.FC<LogoCorDeCambraProps> = (props) => (
  <Icon {...props} component={SVGLogoCorDeCambra} />
);

export default LogoCorDeCambra;
