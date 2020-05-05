import React from "react";
import { useCountProjectes, useHistorialProjectes } from "./hooks";
import { NumberInfo } from "../number-info";
import { ChartCard, MiniBar } from "ant-design-pro/lib/Charts";

export default () => {
  const [countProjectes] = useCountProjectes();
  const [historial] = useHistorialProjectes();

  return (
    <ChartCard title="Projectes">
      <NumberInfo total={countProjectes} />
      <MiniBar line color="#fa8c16" height={45} data={historial} />
    </ChartCard>
  );
};
