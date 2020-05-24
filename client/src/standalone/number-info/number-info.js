import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import PropTypes from "prop-types";
import React from "react";
import "./number-info.css";

const STATUS = ["up", "down"];

const NumberInfo = ({ title, total, status, subTotal }) => (
  <div className="antd-pro-number-info-numberInfo">
    <div className="antd-pro-number-info-numberInfoTitle" title={title}>
      {title}
    </div>
    <div className="antd-pro-number-info-numberInfoValue">
      <span>{total}</span>
      <span className="antd-pro-number-info-subTotal">
        {subTotal}
        {status === STATUS[0] ? <CaretUpFilled /> : <CaretDownFilled />}
      </span>
    </div>
  </div>
);

NumberInfo.propTypes = {
  title: PropTypes.string,
  total: PropTypes.number.isRequired,
  status: PropTypes.oneOf(STATUS),
  subTotal: PropTypes.number,
};

export default NumberInfo;
