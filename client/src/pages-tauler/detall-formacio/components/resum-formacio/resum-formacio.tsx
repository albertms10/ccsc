import { Col, Row, Typography } from "antd";
import { useAPI } from "helpers";
import { Concert, Formacio, Persona, Projecte } from "model";
import { useAssajos } from "pages-tauler/assajos/components/llista-assajos/hooks";
import { FormacioContext } from "pages-tauler/detall-formacio";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ColorCardList } from "standalone/color-card-list";
import { Container } from "standalone/container";
import { linkText, literalList } from "utils";
import { ContentListAssajos } from "../content-list-assajos";
import { ContentListConcerts } from "../content-list-concerts";
import { ContentListPersones } from "../content-list-persones";

const ResumFormacio: React.FC = () => {
  const { t } = useTranslation("dashboard");

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
  const [membres, loadingMembres] = useAPI<Persona[]>(
    `/formacions/${id_formacio}/membres`,
    []
  );

  return (
    <>
      <Container>
        <Typography.Title
          level={4}
          style={{ marginBottom: ".75rem", color: "#555" }}
        >
          {t("projects")}
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
                    ? t("events:with sb", {
                        sb: literalList(directors.map(({ nom }) => nom)),
                      })
                    : altresFormacions.length > 0
                    ? t("events:with sb", {
                        sb: literalList(
                          altresFormacions.map(({ nom_curt }) => nom_curt)
                        ),
                      })
                    : "",
                link: `/${linkText(t("projects"))}/${id_projecte}`,
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
              title={t("members")}
              persones={membres}
              loading={loadingMembres}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResumFormacio;
