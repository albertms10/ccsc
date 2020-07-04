import { ChartCard, MiniBar } from "ant-design-pro/lib/Charts";
import React from "react";
import { useAPI } from "../../helpers";
import { NumberInfo } from "../number-info";

export default () => {
  const [countProjectes] = useAPI("/api/projectes/count");
  const [historial] = useAPI("/api/projectes/historial");

  return (
    <ChartCard title="Projectes">
      <NumberInfo total={countProjectes} />
      <MiniBar line color="#fa8c16" height={45} data={historial} />
    </ChartCard>
  );
};
