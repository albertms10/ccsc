import { StackedArea } from "@ant-design/charts";
import {
  blue,
  cyan,
  gold,
  green,
  magenta,
  red,
  yellow,
} from "@ant-design/colors/lib";
import { Card } from "antd";
import {
  AssistenciaAssaigEstat,
  AssistenciaAssaigVeus,
  AssistenciesAssaig,
} from "model";
import React, { useCallback, useMemo, useState } from "react";
import { useAPI } from "../../../../helpers";
import { dataSplit, dateRange } from "../../../../utils";

const ChartAssistencia: React.FC = () => {
  const [assistenciaAssajosEstat, loadingAssistenciaAssajosEstat] = useAPI<
    AssistenciaAssaigEstat[]
  >(`/assajos/assistencia?group-by=estat`, []);
  const [assistenciaAssajosVeus, loadingAssistenciaAssajosVeus] = useAPI<
    AssistenciaAssaigVeus[]
  >(`/assajos/assistencia?group-by=veus`, []);

  const [key, setKey] = useState("estat");

  const mapAssistencia = useCallback(
    (assistenciaAssajos: AssistenciesAssaig[]): AssistenciesAssaig[] =>
      assistenciaAssajos.map((assaig) => ({
        ...assaig,
        assaig: dateRange(assaig.dia_inici, assaig.hora_inici, "", "", {
          isLong: false,
          includesYear: false,
        }).join(" · "),
      })),
    []
  );

  const estatConfig = useMemo(
    () => ({
      data: dataSplit(mapAssistencia(assistenciaAssajosEstat), "assaig", {
        confirmats_puntuals: "Confirmats puntuals",
        confirmats_retard: "Confirmats amb retard",
        pendents: "Pendents",
        cancelats: "Cancel·lats",
      }),
      color: [green.primary, yellow.primary, blue.primary, red.primary],
      loading: loadingAssistenciaAssajosEstat,
    }),
    [mapAssistencia, assistenciaAssajosEstat, loadingAssistenciaAssajosEstat]
  );

  const veusConfig = useMemo(
    () => ({
      data: dataSplit(mapAssistencia(assistenciaAssajosVeus), "assaig", {
        sopranos: "Sopranos",
        contralts: "Contralts",
        tenors: "Tenors",
        baixos: "Baixos",
      }),
      color: [blue.primary, magenta.primary, cyan.primary, gold.primary],
      loading: loadingAssistenciaAssajosVeus,
    }),
    [mapAssistencia, assistenciaAssajosVeus, loadingAssistenciaAssajosVeus]
  );

  return (
    <Card
      title="Assistència"
      tabList={[
        { key: "estat", tab: "Estat" },
        { key: "veus", tab: "Veus" },
      ]}
      activeTabKey={key}
      onTabChange={setKey}
    >
      <StackedArea
        padding="auto"
        forceFit
        xField="assaig"
        yField="value"
        stackField="type"
        smooth
        {...(key === "estat" ? estatConfig : veusConfig)}
      />
    </Card>
  );
};

export default ChartAssistencia;
