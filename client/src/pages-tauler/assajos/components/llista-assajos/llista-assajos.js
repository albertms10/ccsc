import { List, Space, Typography } from "antd";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { IconAgrupacio } from "../../../../assets/icons";
import { Authorized } from "../../../../components/authorized";
import { DropdownBorderlessButton } from "../../../../standalone/dropdown-borderless-button";
import { FixedTag } from "../../../../standalone/fixed-tag";
import { useAssajos } from "./hooks";

const { Item } = List;
const { Text } = Typography;

export default () => {
  const [assajos, loading] = useAssajos();

  return (
    <List
      dataSource={assajos}
      loading={loading}
      renderItem={(assaig) => (
        <Item
          key={assaig.id_assaig}
          actions={[
            ...(assaig.agrupacions && assaig.agrupacions.length > 0
              ? [
                  <Space>
                    {assaig.agrupacions.map((agrupacio) => (
                      <IconAgrupacio
                        key={agrupacio.id_agrupacio}
                        name={agrupacio.nom_curt}
                      />
                    ))}
                  </Space>,
                ]
              : []),
            ...(assaig.projectes && assaig.projectes.length > 0
              ? [
                  <div>
                    {assaig.projectes.map((projecte) => (
                      <FixedTag
                        key={projecte.id_projecte}
                        childKey={projecte.id_projecte}
                        tooltip={projecte.titol}
                        color={"#" + projecte.color}
                      >
                        {projecte.inicials}
                      </FixedTag>
                    ))}
                  </div>,
                ]
              : []),
            <Authorized>
              <DropdownBorderlessButton
                items={[
                  {
                    key: "eliminar",
                    action: <Text type="danger">Eliminar</Text>,
                  },
                ]}
              />
            </Authorized>,
          ]}
        >
          <Link to={`/assajos/${assaig.id_assaig}`}>
            <Item.Meta
              title={assaig.titol}
              description={
                assaig.hora_inici && assaig.hora_final
                  ? `de ${moment(assaig.data_inici).format("LT")} a ${moment(
                      assaig.data_final
                    ).format("LT")}`
                  : assaig.hora_inici
                  ? `a les ${moment(assaig.data_inici).format("LT")}`
                  : "Hora a determinar"
              }
            >
              Hola
            </Item.Meta>
          </Link>
        </Item>
      )}
    />
  );
};
