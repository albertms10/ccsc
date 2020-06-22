import { StackedColumn } from "@antv/g2plot";
import React from "react";
import ReactG2Plot from "react-g2plot";
import { useAPI } from "../../../../helpers";
import { Container } from "../../../../standalone/container";
import { dataSplit } from "../../../../utils";

export default () => {
  const [assistencia, loading] = useAPI(`/api/assajos/assistencia`);

  return (
    <Container>
      <ReactG2Plot
        className="g2plot-for-react"
        Ctor={StackedColumn}
        config={{
          title: {
            visible: true,
            text: "Assistència",
          },
          description: {
            visible: true,
            text: "Assajos",
          },
          padding: "auto",
          forceFit: true,
          data: dataSplit(assistencia, "assaig", [
            "confirmats_puntuals",
            "retards",
            "pendents",
            "cancelats",
          ]),
          xField: "assaig",
          yField: "value",
          stackField: "type",
          smooth: true,
          loading,
        }}
      />
    </Container>
  );
};
