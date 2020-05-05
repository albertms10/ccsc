import React from "react";
import { NumberInfo } from "../number-info";
import { useCountAssajos, useHistorialAssajos } from "./hooks";
import { ChartCard, MiniArea } from "ant-design-pro/lib/Charts";

export default () => {
  const [countAssajos] = useCountAssajos();
  const [historial] = useHistorialAssajos();

  return (
    <ChartCard title="Assajos">
      <NumberInfo total={countAssajos} />
      <MiniArea
        line
        borderColor="#7cb305"
        color="#d3f261"
        height={45}
        data={historial}
      />
    </ChartCard>
  );
};
