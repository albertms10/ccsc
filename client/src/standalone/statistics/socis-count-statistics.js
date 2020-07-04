import { ChartCard, MiniArea } from "ant-design-pro/lib/Charts";
import React from "react";
import { useAPI } from "../../helpers";
import { NumberInfo } from "../number-info";

export default () => {
  const [countSocis] = useAPI("/api/socis/count");
  const [historial] = useAPI("/api/socis/historial");

  return (
    <ChartCard title="Socis">
      <NumberInfo
        total={countSocis.count_actuals}
        status={
          countSocis.count_altes - countSocis.count_baixes >= 0 ? "up" : "down"
        }
        subTotal={countSocis.count_altes - countSocis.count_baixes}
      />
      <MiniArea line height={45} data={historial} />
    </ChartCard>
  );
};
