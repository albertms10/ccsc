import { Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { PageSkeleton } from "../../components/home-app/components/page-skeleton";

const { Paragraph } = Typography;

const QuiSom: React.FC = () => {
  const { t } = useTranslation("home");

  return (
    <PageSkeleton title={t("bio title")}>
      <Paragraph>
        De recent creació, el Cor de Cambra Sant Cugat reuneix un grup de
        cantaires amb una contrastada experiència en el cant coral, units pel
        desig de fer música amb la màxima qualitat i rigor. Els seus membres han
        compartit altres expe­riències corals molt enriquidores.
      </Paragraph>
      <Paragraph>
        A partir d’aquestes vivències artístiques, el Cor de Cambra Sant Cugat
        vol aportar un espai de creixement musical i humà als seus membres,
        treballant per projectes i amb les aportacions de diversos directors
        convidats.
      </Paragraph>
      <Paragraph>
        Antany va presentar-se en concert a Sant Cugat del Vallès i al Cicle
        Coral de Sant Feliu de Llobregat. Actualment està en un projecte amb la
        Coral Polifònica de Puig-Reig i l’Orquestra Simfònica de Sant Cugat
        cantant la Cantata de Randa, un homenatge a Ramon Llull, de Salvador
        Brotons.
      </Paragraph>
    </PageSkeleton>
  );
};

export default QuiSom;
