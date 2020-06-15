import { Input, List, Space, Typography } from "antd";
import React, { useContext, useState } from "react";
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
const { Search } = Input;

export default () => {
  const formacions = useContext(FormacionsListContext);

  const [searchValue, setSearchValue] = useState("");

  const [projectes, loading] = useProjectes();
  const [showDeleteConfirm] = useEliminarProjecte();

  return (
    <div className="llista-projectes">
      <Search
        placeholder="Cerca projectes"
        size="large"
        value={searchValue}
        onChange={({ target }) => setSearchValue(target.value)}
        allowClear
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <List
        loading={loading}
        dataSource={
          searchValue.length > 0
            ? projectes.filter((projecte) =>
                eventSearchFilter(searchValue, {
                  texts: [
                    projecte.titol,
                    projecte.descripcio,
                    projecte.any_inici_curs,
                    projecte.any_final_curs,
                  ],
                })
              )
            : projectes
        }
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
              <Space size="large">
                <ColorCard color={"#" + projecte.color} />
                <Item.Meta
                  title={projecte.titol}
                  description={
                    <Space direction="vertical">
                      {projecte.directors.length > 0 && (
                        <div>
                          <Text strong>Col·laboradors:</Text>{" "}
                          {literalList(
                            projecte.directors.map(({ nom }) => nom)
                          )}
                        </div>
                      )}
                      {formacions.length > 1 &&
                        projecte.formacions.length > 0 && (
                          <div>
                            <Text strong>Formacions:</Text>{" "}
                            {literalList(
                              projecte.formacions.map(
                                ({ nom_curt }) => nom_curt
                              )
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
    </div>
  );
};
