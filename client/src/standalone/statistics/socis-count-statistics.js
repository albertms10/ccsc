import { ChartCard, MiniArea } from "ant-design-pro/lib/Charts";
import React from "react";
import { NumberInfo } from "../number-info";
import { useCountSocis, useHistorialSocis } from "./hooks";

export default () => {
  const [countSocis] = useCountSocis();
  const [historial] = useHistorialSocis();

  return (
    <ChartCard title="Socis">
      <NumberInfo
        total={countSocis.count_actuals}
        status={
          countSocis.count_altes > countSocis.count_baixes ? "up" : "down"
        }
        subTotal={Math.max(countSocis.count_altes, countSocis.count_baixes)}
      />
      <MiniArea line height={45} data={historial} />
    </ChartCard>
  );
};
