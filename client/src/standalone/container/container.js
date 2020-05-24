import PropTypes from "prop-types";
import React from "react";
import "./container.css";

const Container = ({ reducedPadding, noPadding, noBackground, ...rest }) => (
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

Container.propTypes = {
  reducedPadding: PropTypes.bool,
  noPadding: PropTypes.bool,
  noBackground: PropTypes.bool,
};

Container.defaultProps = {
  reducedPadding: false,
  noPadding: false,
  noBackground: false,
};

export default Container;
