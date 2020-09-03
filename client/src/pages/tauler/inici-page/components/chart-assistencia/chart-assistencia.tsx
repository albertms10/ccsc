import { StackedArea } from "@ant-design/charts";
import { StackedAreaConfig } from "@ant-design/charts/lib/stackedArea";
import {
  blue,
  cyan,
  gold,
  green,
  magenta,
  red,
  yellow,
} from "@ant-design/colors";
import { Card } from "antd";
import { AssistenciaGroupBy } from "common";
import { useAPI } from "helpers";
import {
  AssistenciaAssaigEstat,
  AssistenciaAssaigVeus,
  AssistenciesAssaig,
} from "model";
import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { dataSplit, dateRange } from "utils";

const ChartAssistencia: React.FC = () => {
  const { t } = useTranslation("dashboard");

  const [assistenciaAssajosEstat, loadingAssistenciaAssajosEstat] = useAPI<
    AssistenciaAssaigEstat[]
  >("/assajos/assistencia?group-by=state", []);
  const [assistenciaAssajosVeus, loadingAssistenciaAssajosVeus] = useAPI<
    AssistenciaAssaigVeus[]
  >("/assajos/assistencia?group-by=voices", []);

  const [key, setKey] = useState<AssistenciaGroupBy>("state");

  const mapAssistencia = useCallback(
    (assistenciaAssajos: AssistenciesAssaig[]): AssistenciesAssaig[] =>
      assistenciaAssajos.map((assaig) => ({
        ...assaig,
        assaig: dateRange(assaig.data, assaig.hora_inici, "", "", {
          isLong: false,
          includesYear: false,
          connector: t("common:of connector"),
        }).join(" · "),
      })),
    [t]
  );

  const estatConfig = useMemo(
    () =>
      ({
        data: dataSplit(mapAssistencia(assistenciaAssajosEstat), "assaig", {
          confirmats_puntuals: t("events:confirmed on time"),
          confirmats_retard: t("events:confirmed late"),
          pendents: t("events:pending"),
          cancelats: t("events:cancelled"),
        }),
        color: [green, yellow, blue, red].map((color) => color.primary),
        loading: loadingAssistenciaAssajosEstat,
      } as Partial<StackedAreaConfig>),
    [mapAssistencia, assistenciaAssajosEstat, loadingAssistenciaAssajosEstat, t]
  );

  const veusConfig = useMemo(
    () =>
      ({
        data: dataSplit(mapAssistencia(assistenciaAssajosVeus), "assaig", {
          sopranos: t("voices:sopranos"),
          contralts: t("voices:altos"),
          tenors: t("voices:tenors"),
          baixos: t("voices:basses"),
        }),
        color: [blue, magenta, cyan, gold].map((color) => color.primary),
        loading: loadingAssistenciaAssajosVeus,
      } as Partial<StackedAreaConfig>),
    [mapAssistencia, assistenciaAssajosVeus, loadingAssistenciaAssajosVeus, t]
  );

  return (
    <Card
      title={t("assistance")}
      tabList={[
        { key: "state", tab: t("state") },
        { key: "voices", tab: t("voices") },
      ]}
      activeTabKey={key}
      onTabChange={(key) => setKey(key as AssistenciaGroupBy)}
    >
      <StackedArea
        padding="auto"
        forceFit
        xField="assaig"
        yField="value"
        stackField="type"
        smooth
        {...(key === "state" ? estatConfig : veusConfig)}
      />
    </Card>
  );
};

export default ChartAssistencia;
