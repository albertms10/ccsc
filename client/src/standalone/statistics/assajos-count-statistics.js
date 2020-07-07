import { ChartCard, MiniArea } from "ant-design-pro/lib/Charts";
import React from "react";
import { useAPI } from "../../helpers";
import { NumberInfo } from "../number-info";

export default () => {
  const [countAssajos] = useAPI("/assajos/count", 0);
  const [historial] = useAPI("/assajos/historial");

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
