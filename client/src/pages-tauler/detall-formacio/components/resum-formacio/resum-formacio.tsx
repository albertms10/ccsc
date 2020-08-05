import { Col, Row, Typography } from "antd";
import { Concert, Formacio, Persona, Projecte } from "model";
import React, { useContext } from "react";
import { useAPI } from "../../../../helpers";
import { ColorCardList } from "../../../../standalone/color-card-list";
import { Container } from "../../../../standalone/container";
import { literalList } from "../../../../utils";
import { useAssajos } from "../../../assajos/components/llista-assajos/hooks";
import { FormacioContext } from "../../detall-formacio";
import { ContentListAssajos } from "../content-list-assajos";
import { ContentListConcerts } from "../content-list-concerts";
import { ContentListPersones } from "../content-list-persones";

const ResumFormacio: React.FC = () => {
  const { id_formacio } = useContext(FormacioContext) as Formacio;

  const [assajos, loadingAssajos] = useAssajos();
  const [concerts, loadingConcerts] = useAPI<Concert[]>(
    `/formacions/${id_formacio}/concerts`,
    []
  );
  const [projectes, loadingProjectes] = useAPI<Projecte[]>(
    `/formacions/${id_formacio}/projectes`,
    []
  );
  const [integrants, loadingIntegrants] = useAPI<Persona[]>(
    `/formacions/${id_formacio}/integrants`,
    []
  );

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
          dataSource={projectes.map(
            ({ id_projecte, titol, directors, formacions, color }) => {
              const altresFormacions = formacions.filter(
                (formacio) => formacio.id_formacio !== id_formacio
              );

              return {
                title: titol,
                color: `#${color}`,
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
            }
          )}
          loading={loadingProjectes}
          style={{ marginBottom: 0 }}
        />
      </Container>
      <Container>
        <Row gutter={[32, 32]}>
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
              persones={integrants}
              loading={loadingIntegrants}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResumFormacio;
