import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import React from "react";
import "./number-info.css";

interface NumberInfoProps {
  title?: string;
  total: number;
  status?: "up" | "down";
  subTotal?: number;
}

const NumberInfo: React.FC<NumberInfoProps> = ({
  title,
  total,
  status,
  subTotal,
}) => (
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
        ) : null}
      </span>
    </div>
  </div>
);

export default NumberInfo;
