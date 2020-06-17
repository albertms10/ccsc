import { List, Space, Typography } from "antd";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { IconFormacio } from "../../../../assets/icons";
import { Authorized } from "../../../../components/authorized";
import { FormacionsListContext } from "../../../../components/tauler-app/contexts/formacions-context";
import { ColorCard } from "../../../../standalone/color-card";
import { DropdownBorderlessButton } from "../../../../standalone/dropdown-borderless-button";
import { eventSearchFilter, literalList } from "../../../../utils";
import { useEliminarProjecte, useProjectes } from "./hooks";
import "./llista-projectes.css";

const { Item } = List;
const { Text } = Typography;

const LlistaProjectes = ({ searchValue, inactius }) => {
  const formacions = useContext(FormacionsListContext);
  const [projectes, loading] = useProjectes();
  const [showDeleteConfirm] = useEliminarProjecte();

  const getDataSource = useCallback(() => {
    const list = inactius
      ? projectes
          .filter((projecte) => moment(projecte.data_final).isBefore(moment()))
          .sort(
            (a, b) =>
              b.data_inici && moment(b.data_inici).diff(moment(a.data_inici))
          )
      : projectes.filter(
          (projecte) =>
            !projecte.data_inici ||
            !projecte.data_final ||
            moment().isSameOrBefore(moment(projecte.data_final))
        );

    return searchValue.length > 0
      ? list.filter((projecte) =>
          eventSearchFilter(searchValue, {
            texts: [
              projecte.titol,
              projecte.descripcio,
              projecte.any_inici_curs,
              projecte.any_final_curs,
              ...projecte.formacions.map(({ nom_curt }) => nom_curt),
              ...projecte.directors.map(({ nom }) => nom),
            ],
          })
        )
      : list;
  }, [inactius, projectes, searchValue]);

  return (
    <List
      loading={loading}
      dataSource={getDataSource()}
      renderItem={(projecte) => (
        <Item
          key={projectes.id_projecte}
          actions={[
            ...(formacions.length > 1 &&
            projecte.formacions &&
            projecte.formacions.length > 0
              ? [
                  <Space>
                    {projecte.formacions.map((formacio) => (
                      <IconFormacio
                        key={formacio.id_formacio}
                        name={formacio.nom_curt}
                      />
                    ))}
                  </Space>,
                ]
              : []),
            <Authorized>
              <DropdownBorderlessButton
                items={[
                  {
                    key: "eliminar",
                    action: <Text type="danger">Eliminar</Text>,
                    onClick: () => showDeleteConfirm(projecte.id_projecte),
                  },
                ]}
              />
            </Authorized>,
          ]}
        >
          <Link to={`/projectes/${projecte.id_projecte}`}>
            <Space size="large" {...(inactius && { style: { opacity: 0.6 } })}>
              <ColorCard color={"#" + projecte.color} />
              <Item.Meta
                title={projecte.titol}
                description={
                  <Space direction="vertical">
                    {projecte.directors.length > 0 && (
                      <div>
                        <Text strong>Col·laboradors:</Text>{" "}
                        {literalList(projecte.directors.map(({ nom }) => nom))}
                      </div>
                    )}
                    {formacions.length > 1 && projecte.formacions.length > 0 && (
                      <div>
                        <Text strong>Formacions:</Text>{" "}
                        {literalList(
                          projecte.formacions.map(({ nom_curt }) => nom_curt)
                        )}
                      </div>
                    )}
                  </Space>
                }
              />
            </Space>
          </Link>
        </Item>
      )}
    />
  );
};

LlistaProjectes.propTypes = {
  searchValue: PropTypes.string.isRequired,
  inactius: PropTypes.bool,
};

LlistaProjectes.defaultTypes = {
  inactius: false,
};

export default LlistaProjectes;
