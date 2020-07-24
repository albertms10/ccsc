import { ChartCard, MiniBar } from "ant-design-pro/lib/Charts";
import { ItemGrafica } from "model";
import React from "react";
import { useAPI } from "../../helpers";
import { NumberInfo } from "../number-info";

const ProjectesCountStatistics: React.FC = () => {
  const [countProjectes] = useAPI("/projectes/count", 0);
  const [historial] = useAPI<ItemGrafica[]>("/projectes/historial", []);

  return (
    <ChartCard title="Projectes">
      <NumberInfo total={countProjectes} />
      <MiniBar color="#fa8c16" height={45} data={historial} />
    </ChartCard>
  );
};

export default ProjectesCountStatistics;
