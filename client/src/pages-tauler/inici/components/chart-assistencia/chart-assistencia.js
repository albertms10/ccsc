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
import React, { useCallback, useMemo, useState } from "react";
import { useAPI } from "../../../../helpers";
import { dataSplit, dateRange } from "../../../../utils";

export default () => {
  const [assistenciaEstat, loadingAssistenciaEstat] = useAPI(
    `/api/assajos/assistencia`
  );
  const [assistenciaVeus, loadingAssistenciaVeus] = useAPI(
    `/api/assajos/assistencia?group=veus`
  );

  const [key, setKey] = useState("estat");

  const mapEsdeveniments = useCallback(
    (esdeveniments) =>
      esdeveniments.map((assaig) => ({
        ...assaig,
        assaig:
          "\n" +
          dateRange(assaig.dia_inici, assaig.hora_inici, "", "", {
            long: false,
          }).join(" · "),
      })),
    []
  );

  const estatConfig = useMemo(
    () => ({
      data: dataSplit(mapEsdeveniments(assistenciaEstat), "assaig", {
        confirmats_puntuals: "Confirmats puntuals",
        confirmats_retard: "Confirmats amb retard",
        pendents: "Pendents",
        cancelats: "Cancel·lats",
      }),
      color: [green.primary, yellow.primary, blue.primary, red.primary],
      loading: loadingAssistenciaEstat,
    }),
    [mapEsdeveniments, assistenciaEstat, loadingAssistenciaEstat]
  );

  const veusConfig = useMemo(
    () => ({
      data: dataSplit(mapEsdeveniments(assistenciaVeus), "assaig", {
        sopranos: "Sopranos",
        contralts: "Contralts",
        tenors: "Tenors",
        baixos: "Baixos",
      }),
      color: [blue.primary, magenta.primary, cyan.primary, gold.primary],
      loading: loadingAssistenciaVeus,
    }),
    [mapEsdeveniments, assistenciaVeus, loadingAssistenciaVeus]
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
