import React from "react";

import "./container.css";

export default ({ reducedPadding, noPadding, noBackground, ...rest }) => (
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
