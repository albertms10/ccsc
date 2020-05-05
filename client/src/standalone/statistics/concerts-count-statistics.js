import React from "react";
import { useCountConcerts, useHistorialConcerts } from "./hooks";
import { NumberInfo } from "../number-info";
import { ChartCard, MiniBar } from "ant-design-pro/lib/Charts";

export default () => {
  const [countConcerts] = useCountConcerts();
  const [historial] = useHistorialConcerts();

  return (
    <ChartCard title="Concerts">
      <NumberInfo total={countConcerts} />
      <MiniBar line color="#722ed1" height={45} data={historial} />
    </ChartCard>
  );
};
