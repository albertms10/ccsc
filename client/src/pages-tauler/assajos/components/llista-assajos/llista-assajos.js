import { List, Space, Typography } from "antd";
import moment from "moment";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IconAgrupacio } from "../../../../assets/icons";
import { Authorized } from "../../../../components/authorized";
import { AgrupacionsListContext } from "../../../../components/tauler-app/contexts/agrupacions-context";
import { CalendarAvatar } from "../../../../standalone/calendar-avatar";
import { DropdownBorderlessButton } from "../../../../standalone/dropdown-borderless-button";
import { FixedTag } from "../../../../standalone/fixed-tag";
import { timeRange } from "../../../../utils";
import { useAssajos } from "./hooks";

const { Item } = List;
const { Text } = Typography;

export default () => {
  const agrupacions = useContext(AgrupacionsListContext);
  const [assajos, loading] = useAssajos();

  return (
    <List
      dataSource={assajos}
      loading={loading}
      renderItem={(assaig) => (
        <Item
          key={assaig.id_assaig}
          actions={[
            ...(agrupacions.length > 1 &&
            assaig.agrupacions &&
            assaig.agrupacions.length > 0
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
            <Space size="large">
              <CalendarAvatar
                moment={moment(assaig.data_inici)}
                style={{ transform: "scale(1.2)" }}
              />
              <Item.Meta
                title={assaig.titol}
                description={timeRange(
                  assaig.hora_inici ? assaig.data_inici : "",
                  assaig.data_final,
                  { textual: true }
                )}
              />
            </Space>
          </Link>
        </Item>
      )}
    />
  );
};
