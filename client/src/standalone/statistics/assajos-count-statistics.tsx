import { ChartCard, MiniArea } from "ant-design-pro/lib/Charts";
import { useAPI } from "helpers";
import { ItemGrafica } from "model";
import React from "react";
import { useTranslation } from "react-i18next";
import { NumberInfo } from "standalone/number-info";

const AssajosCountStatistics: React.FC = () => {
  const { t } = useTranslation("dashboard");

  const [countAssajos] = useAPI("/assajos/count", 0);
  const [historial] = useAPI<ItemGrafica[]>("/assajos/historial", []);

  return (
    <ChartCard title={t("rehearsals")}>
      <NumberInfo total={countAssajos} />
      <MiniArea
        line
        borderColor="#7cb305"
        color="#d3f261"
        height={45}
        data={historial}
      />
    </ChartCard>
  );
};

export default AssajosCountStatistics;
