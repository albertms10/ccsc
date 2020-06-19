import { Col, Row, Typography } from "antd";
import React, { useContext } from "react";
import { ColorCardList } from "../../../../standalone/color-card-list";
import { Container } from "../../../../standalone/container";
import { literalList } from "../../../../utils";
import { useAssajos } from "../../../assajos/components/llista-assajos/hooks";
import { FormacioContext } from "../../formacio";
import { ContentListAssajos } from "../content-list-assajos";
import { ContentListConcerts } from "../content-list-concerts";
import { ContentListPersones } from "../content-list-persones";
import { useConcerts, useIntegrants, useProjectes } from "./hooks";

export default () => {
  const { id_formacio } = useContext(FormacioContext);
  const [assajos, loadingAssajos] = useAssajos();
  const [concerts, loadingConcerts] = useConcerts(id_formacio);
  const [projectes, loadingProjectes] = useProjectes(id_formacio);
  const [persones, loadingIntegrants] = useIntegrants(id_formacio);

  return (
    <>
      <Container>
        <Typography.Title
          level={4}
          style={{ marginBottom: ".75rem", color: "#555" }}
        >
          Projectes
        </Typography.Title>
        <ColorCardList
          dataSource={projectes}
          loading={loadingProjectes}
          mapItem={({ id_projecte, titol, directors, formacions, color }) => {
            const altresFormacions = formacions.filter(
              (formacio) => formacio.id_formacio !== id_formacio
            );

            return {
              title: titol,
              color: "#" + color,
              description:
                directors.length > 0
                  ? `Amb ${literalList(directors.map(({ nom }) => nom))}`
                  : altresFormacions.length > 0
                  ? `Amb ${literalList(
                      altresFormacions.map(({ nom_curt }) => nom_curt)
                    )}`
                  : "",
              link: `/projectes/${id_projecte}`,
            };
          }}
          style={{ marginBottom: 0 }}
        />
      </Container>
      <Container>
        <Row type="flex" gutter={[32, 32]}>
          <Col sm={24} lg={12} flex={1}>
            <ContentListAssajos assajos={assajos} loading={loadingAssajos} />
            <ContentListConcerts
              concerts={concerts}
              loading={loadingConcerts}
            />
          </Col>
          <Col sm={24} lg={12} flex={1}>
            <ContentListPersones
              title="Integrants"
              persones={persones}
              loading={loadingIntegrants}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
