import { blue, green, red, yellow } from "@ant-design/colors/lib";
import { StackedArea } from "@antv/g2plot";
import { Card } from "antd";
import React, { useMemo, useState } from "react";
import ReactG2Plot from "react-g2plot";
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
      data: dataSplit(assistenciaEstat, "assaig", [
        "confirmats_puntuals",
        "retards",
        "pendents",
        "cancelats",
      ]),
      color: [green.primary, yellow.primary, blue.primary, red.primary],
      loading: loadingAssistenciaEstat,
    }),
    [assistenciaEstat, loadingAssistenciaEstat]
  );

  const veusConfig = useMemo(
    () => ({
      data: dataSplit(assistenciaVeus, "assaig", [
        "sopranos",
        "contralts",
        "tenors",
        "baixos",
      ]),
      loading: loadingAssistenciaVeus,
    }),
    [assistenciaVeus, loadingAssistenciaVeus]
  );

  return (
    <Card
      title="Assitència"
      tabList={[
        {
          key: "estat",
          tab: "Estat",
        },
        {
          key: "veus",
          tab: "Veus",
        },
      ]}
      activeTabKey={key}
      onTabChange={setKey}
    >
      <ReactG2Plot
        className="g2plot-for-react"
        Ctor={StackedArea}
        config={{
          padding: "auto",
          forceFit: true,
          xField: "assaig",
          yField: "value",
          stackField: "type",
          ...(key === "estat" ? estatConfig : veusConfig),
        }}
      />
    </Card>
  );
};
