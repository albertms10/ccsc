import { ChartCard, MiniBar } from "ant-design-pro/lib/Charts";
import { useAPI } from "helpers";
import { ItemGrafica } from "model";
import React from "react";
import { useTranslation } from "react-i18next";
import { NumberInfo } from "../number-info";

const ProjectesCountStatistics: React.FC = () => {
  const { t } = useTranslation("dashboard");

  const [countProjectes] = useAPI("/projectes/count", 0);
  const [historial] = useAPI<ItemGrafica[]>("/projectes/historial", []);

  return (
    <ChartCard title={t("projects")}>
      <NumberInfo total={countProjectes} />
      <MiniBar color="#fa8c16" height={45} data={historial} />
    </ChartCard>
  );
};

export default ProjectesCountStatistics;
