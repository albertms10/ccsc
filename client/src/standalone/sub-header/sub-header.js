import PropTypes from "prop-types";
import React from "react";
import "./sub-header.css";

const SubHeader = ({ title, style }) => (
  <div className="sub-header" style={style}>
    {title}
  </div>
);

SubHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SubHeader;
