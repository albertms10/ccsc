import React from "react";
import moment from "moment";
import { Avatar, Col, Row } from "antd";
import { ContentList } from "../../../../standalone/content-list";
import { FixedTag } from "../../../../standalone/fixed-tag";
import { CalendarAvatar } from "../../../../standalone/calendar-avatar";
import { SmallBadge } from "../../../../standalone/small-badge";
import { Container } from "../../../../standalone/container";
import {
  useAssajos,
  useConcerts,
  useParticipants,
  useProjectes,
} from "../../hooks";

export default ({ idAgrupacio }) => {
  const [assajos, loadingAssajos] = useAssajos(idAgrupacio);
  const [concerts, loadingConcerts] = useConcerts(idAgrupacio);
  const [projectes, loadingProjectes] = useProjectes(idAgrupacio);
  const [participants, loadingParticipants] = useParticipants(idAgrupacio);

  return (
    <Container>
      <Row type="flex" gutter={[32, 32]}>
        <Col sm={24} lg={12}>
          <ContentList
            title="Assajos"
            loading={loadingAssajos}
            data={assajos.map(
              ({
                id_assaig,
                data_inici,
                hora_inici,
                es_general,
                es_extra,
                projectes,
              }) => {
                const date = moment(data_inici);

                return {
                  id: id_assaig,
                  title: `Assaig${es_general ? " general" : ""}${
                    es_extra ? " extra" : ""
                  }`,
                  description: hora_inici ? `a les ${date.format("LT")}` : "",
                  extra: projectes
                    ? projectes.map((projecte) => (
                        <FixedTag
                          key={projecte.id_projecte}
                          childKey={projecte.id_projecte}
                          tooltip={`Projecte «${projecte.titol}»`}
                          color={"#" + projecte.color}
                        >
                          {projecte.inicials}
                        </FixedTag>
                      ))
                    : null,
                  avatar: <CalendarAvatar moment={date} />,
                };
              }
            )}
          />
          <ContentList
            title="Concerts"
            loading={loadingConcerts}
            data={concerts.map(
              ({
                id_concert,
                titol_concert,
                data_inici,
                titol_projecte,
                inicials_projecte,
                color_projecte,
              }) => {
                const date = moment(data_inici);

                return {
                  id: id_concert,
                  title: titol_concert,
                  description: `a les ${date.format("LT")}`,
                  extra: titol_projecte ? (
                    <FixedTag
                      tooltip={`Projecte «${titol_projecte}»`}
                      color={"#" + color_projecte}
                    >
                      {inicials_projecte}
                    </FixedTag>
                  ) : null,
                  avatar: <CalendarAvatar moment={date} />,
                };
              }
            )}
            style={{ marginTop: 32 }}
          />
        </Col>
        <Col sm={24} lg={12}>
          <ContentList
            title="Projectes"
            loading={loadingProjectes}
            data={projectes.map(
              ({
                id_projecte,
                titol,
                directors,
                agrupacions,
                inicials,
                color,
              }) => ({
                id: id_projecte,
                title: titol,
                description:
                  directors || agrupacions ? (
                    <>
                      Amb la col·laboració de <b>{directors[0].nom}</b>
                    </>
                  ) : null,
                avatar: (
                  <Avatar
                    shape="square"
                    style={{ backgroundColor: `#${color}` }}
                  >
                    {inicials}
                  </Avatar>
                ),
              })
            )}
          />
          <ContentList
            title="Participants"
            loading={loadingParticipants}
            data={participants.map(
              ({
                id_persona,
                nom,
                cognoms,
                nom_complet,
                veu,
                abreviatura_veu,
              }) => ({
                id: id_persona,
                title: nom_complet,
                description: veu,
                avatar: (
                  <SmallBadge
                    count={abreviatura_veu}
                    style={{
                      backgroundColor: "#fff",
                      color: "#999",
                      boxShadow: "0 0 0 1px #d9d9d9 inset",
                    }}
                  >
                    <Avatar shape="circle">
                      {nom[0]}
                      {cognoms[0]}
                    </Avatar>
                  </SmallBadge>
                ),
              })
            )}
            style={{ marginTop: 32 }}
          />
        </Col>
      </Row>
    </Container>
  );
};
