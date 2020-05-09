import { ChartCard, MiniBar } from "ant-design-pro/lib/Charts";
import React from "react";
import { NumberInfo } from "../number-info";
import { useCountProjectes, useHistorialProjectes } from "./hooks";

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
