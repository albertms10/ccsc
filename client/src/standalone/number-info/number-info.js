import React from "react";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";

import "./number-info.css";

export default ({ title, total, status, subTotal }) => (
  <div className="antd-pro-number-info-numberInfo">
    <div className="antd-pro-number-info-numberInfoTitle" title={title}>
      {title}
    </div>
    <div className="antd-pro-number-info-numberInfoValue">
      <span>{total}</span>
      <span className="antd-pro-number-info-subTotal">
        {subTotal}
        {status === "up" ? (
          <CaretUpFilled />
        ) : status === "down" ? (
          <CaretDownFilled />
        ) : (
          ""
        )}
      </span>
    </div>
  </div>
);
