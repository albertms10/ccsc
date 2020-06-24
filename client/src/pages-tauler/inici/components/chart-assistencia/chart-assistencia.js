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
import React, { useMemo, useState } from "react";
import { useAPI } from "../../../../helpers";
import { dataSplit } from "../../../../utils";

export default () => {
  const [assistenciaEstat, loadingAssistenciaEstat] = useAPI(
    `/api/assajos/assistencia`
  );
  const [assistenciaVeus, loadingAssistenciaVeus] = useAPI(
    `/api/assajos/assistencia?group=veus`
  );

  const [key, setKey] = useState("estat");

  const estatConfig = useMemo(
    () => ({
      data: dataSplit(assistenciaEstat, "assaig", {
        confirmats_puntuals: "Confirmats puntuals",
        confirmats_retard: "Confirmats amb retard",
        pendents: "Pendents",
        cancelats: "Cancel·lats",
      }),
      color: [green.primary, yellow.primary, blue.primary, red.primary],
      loading: loadingAssistenciaEstat,
    }),
    [assistenciaEstat, loadingAssistenciaEstat]
  );

  const veusConfig = useMemo(
    () => ({
      data: dataSplit(assistenciaVeus, "assaig", {
        sopranos: "Sopranos",
        contralts: "Contralts",
        tenors: "Tenors",
        baixos: "Baixos",
      }),
      color: [blue.primary, magenta.primary, cyan.primary, gold.primary],
      loading: loadingAssistenciaVeus,
    }),
    [assistenciaVeus, loadingAssistenciaVeus]
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
