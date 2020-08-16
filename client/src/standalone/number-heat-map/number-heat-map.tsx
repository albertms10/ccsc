import React from "react";
import { mapNumber } from "../../utils";

interface NumberHeatMap {
  number: number;
}

const NumberHeatMap: React.FC<NumberHeatMap> = ({ number }) => (
  <div
    style={{
      flex: 1,
      backgroundColor: `rgba(29, 113, 184, ${mapNumber(number, {
        outMin: 0.2,
      })})`,
    }}
  />
);

export default NumberHeatMap;
