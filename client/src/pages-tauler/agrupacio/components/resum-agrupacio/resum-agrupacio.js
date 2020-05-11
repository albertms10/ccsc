import { Avatar, Col, Row } from "antd";
import moment from "moment";
import React from "react";
import { CalendarAvatar } from "../../../../standalone/calendar-avatar";
import { ColorCardList } from "../../../../standalone/color-card-list";
import { Container } from "../../../../standalone/container";
import { ContentList } from "../../../../standalone/content-list";
import { FixedTag } from "../../../../standalone/fixed-tag";
import { SmallBadge } from "../../../../standalone/small-badge";
import { kebabCase } from "../../../../utils";
import { useAssajos, useConcerts, useIntegrants, useProjectes } from "./hooks";

export default ({ agrupacio }) => {
  const { id_agrupacio: idAgrupacio, nom_curt: nomCurt } = agrupacio;

  const [assajos, loadingAssajos] = useAssajos(idAgrupacio);
  const [concerts, loadingConcerts] = useConcerts(idAgrupacio);
  const [projectes, loadingProjectes] = useProjectes(idAgrupacio);
  const [integrants, loadingIntegrants] = useIntegrants(idAgrupacio);

  const rootPathAgrupacio = kebabCase(nomCurt);

  return (
    <Container>
      <ColorCardList
        dataSource={projectes}
        loading={loadingProjectes}
        style={{ marginBottom: 32 }}
      />
      <Row type="flex" gutter={[32, 32]}>
        <Col sm={24} lg={12} flex={1}>
          <ContentList
            title="Assajos"
            loading={loadingAssajos}
            data={assajos.map((assaig) => {
              const date = moment(assaig.data_inici);

              return {
                id: assaig.id_assaig,
                title: `Assaig${assaig.es_general ? " general" : ""}${
                  assaig.es_extra ? " extra" : ""
                }`,
                description: assaig.hora_inici
                  ? `a les ${date.format("LT")}`
                  : "",
                link: `/${rootPathAgrupacio}/assajos/${assaig.id_assaig}`,
                extra: assaig.projectes
                  ? assaig.projectes.map((projecte) => (
                      <FixedTag
                        key={projecte.id_projecte}
                        childKey={projecte.id_projecte}
                        tooltip={projecte.titol}
                        color={"#" + projecte.color}
                      >
                        {projecte.inicials}
                      </FixedTag>
                    ))
                  : null,
                avatar: <CalendarAvatar moment={date} />,
              };
            })}
          />
          <ContentList
            title="Concerts"
            loading={loadingConcerts}
            data={concerts.map((concert) => {
              const date = moment(concert.data_inici);

              return {
                id: concert.id_concert,
                title: concert.titol_concert,
                description: `a les ${date.format("LT")}`,
                link: `/${rootPathAgrupacio}/concerts/${concert.id_concert}`,
                extra: concert.titol_projecte ? (
                  <FixedTag
                    tooltip={`Projecte «${concert.titol_projecte}»`}
                    color={"#" + concert.color_projecte}
                  >
                    {concert.inicials_projecte}
                  </FixedTag>
                ) : null,
                avatar: <CalendarAvatar moment={date} />,
              };
            })}
            style={{ marginTop: 32 }}
          />
        </Col>
        <Col sm={24} lg={12} flex={1}>
          <ContentList
            title="Integrants"
            loading={loadingIntegrants}
            data={integrants.map((integrant) => ({
              id: integrant.id_persona,
              title: integrant.nom_complet,
              description: integrant.veu,
              link: `/socis/${integrant.id_persona}`,
              avatar: (
                <SmallBadge
                  count={integrant.abreviatura_veu}
                  style={{
                    backgroundColor: "#fff",
                    color: "#999",
                    boxShadow: "0 0 0 1px #d9d9d9 inset",
                  }}
                >
                  <Avatar shape="circle">
                    {integrant.nom[0]}
                    {integrant.cognoms[0]}
                  </Avatar>
                </SmallBadge>
              ),
            }))}
          />
        </Col>
      </Row>
    </Container>
  );
};