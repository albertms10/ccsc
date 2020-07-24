import React from "react";
import "./container.css";
import { StyledComponent } from "react-types";

interface ContainerProps extends StyledComponent {
  reducedPadding?: boolean;
  noPadding?: boolean;
  noBackground?: boolean;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  reducedPadding = false,
  noPadding = false,
  noBackground = false,
  ...rest
}) => (
  <div
    className={`
    main-container
    ${
      reducedPadding
        ? "main-container-padding-reduced"
        : noPadding
        ? ""
        : "main-container-padding"
    }
    ${noBackground ? "" : "main-container-background"}
    `}
    {...rest}
  />
);

export default Container;
