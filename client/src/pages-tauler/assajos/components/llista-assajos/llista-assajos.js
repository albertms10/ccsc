import { List, Space, Typography } from "antd";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IconAgrupacio } from "../../../../assets/icons";
import { Authorized } from "../../../../components/authorized";
import { AgrupacionsListContext } from "../../../../components/tauler-app/contexts/agrupacions-context";
import { CalendarAvatar } from "../../../../standalone/calendar-avatar";
import { DropdownBorderlessButton } from "../../../../standalone/dropdown-borderless-button";
import { FixedTag } from "../../../../standalone/fixed-tag";
import { timeRange } from "../../../../utils";
import { useAssajos, useEliminarAssaig } from "./hooks";

const { Item } = List;
const { Text } = Typography;

const LlistaAssajos = ({ anteriors }) => {
  const agrupacions = useContext(AgrupacionsListContext);
  const [assajos, loading] = useAssajos();
  const [showDeleteConfirm] = useEliminarAssaig();

  return (
    <List
      dataSource={
        anteriors
          ? assajos
              .filter((assaig) => moment(assaig.data_inici).isBefore(moment()))
              .sort((a, b) => moment(b.data_inici).diff(moment(a.data_inici)))
          : assajos.filter((assaig) =>
              moment().isSameOrBefore(moment(assaig.data_inici))
            )
      }
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
                    onClick: () => showDeleteConfirm(assaig.id_assaig)
                  },
                ]}
              />
            </Authorized>,
          ]}
        >
          <Link to={`/assajos/${assaig.id_assaig}`}>
            <Space size="large" {...(anteriors && { style: { opacity: 0.6 } })}>
              <CalendarAvatar
                moment={moment(assaig.data_inici)}
                style={{
                  transform: "scale(1.25)",
                  position: "relative",
                  left: "5px",
                }}
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

LlistaAssajos.propTypes = {
  anteriors: PropTypes.bool,
};

LlistaAssajos.defaultProps = {
  anteriors: false,
};

export default LlistaAssajos;
