import { ChartCard, MiniBar } from "ant-design-pro/lib/Charts";
import { ItemGrafica } from "model";
import React from "react";
import { useAPI } from "../../helpers";
import { NumberInfo } from "../number-info";

const ConcertsCountStatistics: React.FC = () => {
  const [countConcerts] = useAPI("/concerts/count", 0);
  const [historial] = useAPI<ItemGrafica[]>("/concerts/historial", []);

  return (
    <ChartCard title="Concerts">
      <NumberInfo total={countConcerts} />
      <MiniBar color="#722ed1" height={45} data={historial} />
    </ChartCard>
  );
};

export default ConcertsCountStatistics;
