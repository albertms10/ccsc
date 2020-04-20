import React from "react";

import "./container.css";

export default ({ noPadding, noBackground, ...rest }) => (
  <div
    className={`
    main-container
    ${noPadding ? "" : "main-container-padding"}
    ${noBackground ? "" : "main-container-background"}
    `}
    {...rest}
  />
);
