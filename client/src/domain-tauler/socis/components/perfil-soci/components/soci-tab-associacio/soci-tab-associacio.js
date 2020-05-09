import { Alert, Button, Space, Switch, Tag, Typography } from "antd";
import React, { useContext } from "react";
import { SettingCard } from "../../../../../../standalone/setting-card";
import { SociContext } from "../../perfil-soci";
import { useAcceptaDretsImatge, useAcceptaProteccioDades } from "./hooks";

const { Paragraph } = Typography;

export default () => {
  const soci = useContext(SociContext);
  const [
    acceptaProteccioDades,
    putAcceptaProteccioDades,
  ] = useAcceptaProteccioDades(soci);
  const [acceptaDretsImatge, putAcceptaDretsImatge] = useAcceptaDretsImatge(
    soci
  );

  return (
    <Space size="large" direction="vertical">
      <SettingCard
        title="Protecció de dades"
        alert={
          <Alert
            type="warning"
            showIcon
            message="Has d’acceptar la protecció de dades."
          />
        }
        alertCondition={!acceptaProteccioDades}
        actionItem={
          <Switch
            checked={acceptaProteccioDades}
            disabled={acceptaProteccioDades}
            onChange={putAcceptaProteccioDades}
          />
        }
        actionTooltip="Cal acceptar la protecció de dades"
        info={
          <>
            <Paragraph>
              D’acord amb l’article 5 de la Llei orgànica 15/1999 de protecció
              de dades de caràcter personal, les vostres dades seran
              incorporades i tractades al fitxer intern el qual és responsable
              l’Associació Musical Catalana Crescendo.
            </Paragraph>
            <Paragraph>
              La finalitat és poder portar a termer les tasques de gestió de
              l’associació, oferir informació relacionada amb l’organització i
              actuació del Cor de Cambra Sant Cugat, informar de la gestió dels
              òrgans de govern compartir la documentació que s'enderivi de
              caràcter institucional o material formatiu que pugui resultar de
              l’interès dels associats sempre relacionat amb la finalitat de
              l’entitat.
            </Paragraph>
            <Paragraph>
              Podeu exercir els drets d’accés, rectificació, cancel·lació i
              oposició mitjançant un escrit adreçat a{" "}
              <Tag style={{ marginRight: 2 }}>
                <a href="mailto:secretaria@cordecambrasantcugat.cat">
                  secretaria@cordecambrasantcugat.cat
                </a>
              </Tag>
              .
            </Paragraph>
          </>
        }
      />
      <SettingCard
        title="Drets d’imatge"
        actionItem={
          <Switch
            checked={acceptaDretsImatge}
            onChange={putAcceptaDretsImatge}
          />
        }
        info={
          <Paragraph>
            Atès que el dret a la imatge es troba regulat per l'article 18.1 de
            la Constitució, per la Llei Orgànica 1/1982 sobre el dret a l'honor,
            a la intimitat personal i familiar, i per la Llei Orgànica 15/1999
            de Protecció de Dades de Caràcter Personal, sol·licitem el seu
            consentiment per publicar les seva imatge o veu, de forma clarament
            identificable, en fotografies i gravacions corresponents a les
            activitats pròpies de l'associació, i que s’exposin públicament a la
            pàgina web, revistes, YouTube o altres publicacions internes o de
            tercers, així com a reproduir-la públicament per a la promoció de
            les activitats i serveis de les entitats. El present consentiment i
            autorització s'atorga de forma gratuïta i amb renúncia formal a
            qualsevol contraprestació econòmica.
          </Paragraph>
        }
      />
      <SettingCard
        title="Donar-se de baixa"
        actionItem={<Button type="danger">Baixa</Button>}
      />
    </Space>
  );
};
