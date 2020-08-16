import React from "react";
import { mapNumber } from "../../utils";

interface NumberHeatMap {
  numbers: number[];
}

const NumberHeatMap: React.FC<NumberHeatMap> = ({ numbers }) => (
  <div style={{ display: "flex", height: 14 }}>
    {numbers.map((number, index) => (
      <div
        key={`heatmap-${index + 1}`}
        style={{
          flex: 1,
          backgroundColor: `rgba(29, 113, 184, ${mapNumber(number, {
            outMin: 0.2,
          })})`,
        }}
      />
    ))}
  </div>
);

export default NumberHeatMap;
