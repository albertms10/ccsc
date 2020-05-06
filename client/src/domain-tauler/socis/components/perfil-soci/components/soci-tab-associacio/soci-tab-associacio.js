import React, { useCallback, useContext, useEffect, useState } from "react";
import { Col, message, Row, Switch, Tooltip } from "antd";
import { SociContext } from "../../perfil-soci";
import { SubHeader } from "../../../../../../standalone/sub-header";
import { fetchAPI } from "../../../../../../helpers";
import { useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  const soci = useContext(SociContext);
  const [acceptaDretsImatge, setAcceptaDretsImatge] = useState(false);

  useEffect(() => {
    setAcceptaDretsImatge(soci.accepta_drets_imatge);
  }, [soci.accepta_drets_imatge]);

  const handleAcceptaDretsImatge = useCallback(
    (accepta_drets_imatge) => {
      fetchAPI(
        `/api/socis/${soci.id_soci}/accepta-drets-imatge`,
        ({ accepta_drets_imatge }) => {
          setAcceptaDretsImatge(accepta_drets_imatge);
          message.success(
            `S’ha ${
              accepta_drets_imatge ? "" : "des"
            }activat l’acceptació dels drets d’imatge.`
          );
        },
        dispatch,
        {
          method: "PUT",
          body: JSON.stringify({ accepta_drets_imatge }),
        }
      );
    },
    [soci, dispatch]
  );

  return (
    <Row justify="center" align="middle" gutter={[16, 16]}>
      <Col span={24}>
        <SubHeader title="Protecció de dades" />
      </Col>
      <Col span={20}>
        D’acord amb l’article 5 de la Llei orgànica 15/1999 de protecció de
        dades de caràcter personal, les vostres dades seran incorporades i
        tractades al fitxer intern el qual és responsable l'Associació Musical
        Catalana Crescendo. La finalitat és poder portar a termer les tasques de
        gestió de l'associació, oferir informació relacionada amb l'organització
        i actuació del Cor de Cambra Sant Cugat, informar de la gestió dels
        òrgans de govern compartir la documentació que s'enderivi de carácter
        institucional o material formatiu que pugui resultar de l'interés dels
        associats sempre relacionat amb la finalitat de l'entitat. Podeu exercir
        els drets d’accés, rectificació, cancel·lació i oposició mitjançant un
        escrit adreçat a{" "}
        <a href="mailto:secretaria@cordecambrasantcugat.cat">
          secretaria@cordecambrasantcugat.cat
        </a>
        .
      </Col>
      <Col span={4}>
        <Tooltip title="Cal acceptar la protecció de dades">
          <Switch checked={soci.accepta_proteccio_dades} disabled />
        </Tooltip>
      </Col>
      <Col span={24}>
        <SubHeader title="Drets d’imatge" />
      </Col>
      <Col span={20}>
        Atès que el dret a la imatge es troba regulat per l'article 18.1 de la
        Constitució, per la Llei Orgànica 1/1982 sobre el dret a l'honor, a la
        intimitat personal i familiar, i per la Llei Orgànica 15/1999 de
        Protecció de Dades de Caràcter Personal, sol·licitem el seu consentiment
        per publicar les seva imatge o veu, de forma clarament identificable, en
        fotografies i gravacions corresponents a les activitats pròpies de
        l'associació, i que s’exposin públicament a la pàgina web, revistes,
        YouTube o altres publicacions internes o de tercers, així com a
        reproduir-la públicament per a la promoció de les activitats i serveis
        de les entitats. El present consentiment i autorització s'atorga de
        forma gratuïta i amb renúncia formal a qualsevol contraprestació
        econòmica.
      </Col>
      <Col span={4}>
        <Switch
          checked={acceptaDretsImatge}
          onChange={handleAcceptaDretsImatge}
        />
      </Col>
    </Row>
  );
};
