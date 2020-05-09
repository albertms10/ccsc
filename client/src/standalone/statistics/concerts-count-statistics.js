import { ChartCard, MiniBar } from "ant-design-pro/lib/Charts";
import React from "react";
import { NumberInfo } from "../number-info";
import { useCountConcerts, useHistorialConcerts } from "./hooks";

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
