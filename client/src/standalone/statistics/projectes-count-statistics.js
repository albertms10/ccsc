import { ChartCard, MiniBar } from "ant-design-pro/lib/Charts";
import React from "react";
import { useAPI } from "../../helpers";
import { NumberInfo } from "../number-info";

export default () => {
  const [countProjectes] = useAPI("/projectes/count", 0);
  const [historial] = useAPI("/projectes/historial");

  return (
    <ChartCard title="Projectes">
      <NumberInfo total={countProjectes} />
      <MiniBar line color="#fa8c16" height={45} data={historial} />
    </ChartCard>
  );
};
