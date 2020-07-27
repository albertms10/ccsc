import { Spin } from "antd";
import React from "react";

interface CenteredSpinProps {
  tip?: string;
}

const CenteredSpin: React.FC<CenteredSpinProps> = ({ tip }) => (
  <Spin tip={tip}>
    <div style={{ textAlign: "center", height: "100vh" }} />
  </Spin>
);

export default CenteredSpin;
