import { ChartCard, MiniBar } from "ant-design-pro/lib/Charts";
import React from "react";
import { useAPI } from "../../helpers";
import { NumberInfo } from "../number-info";

export default () => {
  const [countConcerts] = useAPI("/api/concerts/count");
  const [historial] = useAPI("/api/concerts/historial");

  return (
    <ChartCard title="Concerts">
      <NumberInfo total={countConcerts} />
      <MiniBar line color="#722ed1" height={45} data={historial} />
    </ChartCard>
  );
};
