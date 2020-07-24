import { ChartCard, MiniArea } from "ant-design-pro/lib/Charts";
import { CountSocis, ItemGrafica } from "model";
import React from "react";
import { useAPI } from "../../helpers";
import { NumberInfo } from "../number-info";

const SocisCountStatistics: React.FC = () => {
  const [countSocis] = useAPI<CountSocis>("/socis/count", {} as CountSocis);
  const [historial] = useAPI<ItemGrafica[]>("/socis/historial", []);

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

export default SocisCountStatistics;
