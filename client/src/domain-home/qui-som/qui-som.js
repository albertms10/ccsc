import React from "react";
import { Typography } from "antd";
import { PageSkeleton } from "../../components/page-skeleton";

const { Paragraph } = Typography;

export default () => (
  <PageSkeleton title="Qui som?">
    <Paragraph>
      De recent creació, el Cor de Cambra Sant Cugat reuneix un grup de
      cantaires amb una contrastada experiència en el cant coral, units pel
      desig de fer música amb la màxima qualitat i rigor. Els seus membres han
      compartit altres expe­riències corals molt enriquidores.
    </Paragraph>
    <Paragraph>
      A partir d’aquestes vivències artístiques, el Cor de Cambra Sant Cugat vol
      aportar un espai de creixement musical i humà als seus membres, treballant
      per projectes i amb les aportacions de diversos directors convidats.
    </Paragraph>
    <Paragraph>
      Antany va presentar-se en concert a Sant Cugat del Vallès i al Cicle Coral
      de Sant Feliu de Llobregat. Actualment està en un projecte amb la Coral
      Polifònica de Puig-Reig i l’Orquestra Simfònica de Sant Cugat cantant la
      Cantata de Randa, un homenatge a Ramon Llull, de Salvador Brotons.
    </Paragraph>
  </PageSkeleton>
);
