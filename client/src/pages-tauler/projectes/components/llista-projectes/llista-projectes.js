import { List, Space, Typography } from "antd";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IconAgrupacio } from "../../../../assets/icons";
import { Authorized } from "../../../../components/authorized";
import { AgrupacionsListContext } from "../../../../components/tauler-app/contexts/agrupacions-context";
import { ColorCard } from "../../../../standalone/color-card";
import { DropdownBorderlessButton } from "../../../../standalone/dropdown-borderless-button";
import { literalList } from "../../../../utils";
import { useEliminarProjecte, useProjectes } from "./hooks";
import "./llista-projectes.css";

const { Item } = List;
const { Text } = Typography;

export default () => {
  const agrupacions = useContext(AgrupacionsListContext);
  const [projectes, loading] = useProjectes();
  const [showDeleteConfirm] = useEliminarProjecte();

  return (
    <div className="llista-projectes">
      <List
        loading={loading}
        dataSource={projectes}
        renderItem={(projecte) => (
          <Item
            key={projectes.id_projecte}
            actions={[
              ...(agrupacions.length > 1 &&
              projecte.agrupacions &&
              projecte.agrupacions.length > 0
                ? [
                    <Space>
                      {projecte.agrupacions.map((agrupacio) => (
                        <IconAgrupacio
                          key={agrupacio.id_agrupacio}
                          name={agrupacio.nom_curt}
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
                      {agrupacions.length > 1 &&
                        projecte.agrupacions.length > 0 && (
                          <div>
                            <Text strong>Agrupacions:</Text>{" "}
                            {literalList(
                              projecte.agrupacions.map(
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
