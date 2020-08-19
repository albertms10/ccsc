import React from "react";
import { StyledComponent } from "react-types";
import { mapNumber } from "../../../../utils";

export interface HeatMapNumbersProps extends StyledComponent {
  numbers?: number[];
}

const HeatMapNumbers: React.FC<HeatMapNumbersProps> = ({
  numbers = [],
  style,
}) => (
  <div style={{ display: "flex", height: 14, ...style }}>
    {numbers.map((number, index) => (
      <div
        key={`heatmap-numbers-${index + 1}`}
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

export default HeatMapNumbers;
