import { List, Space, Typography } from "antd";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { IconFormacio } from "../../../../assets/icons";
import { Authorized } from "../../../../components/authorized";
import { FormacionsListContext } from "../../../../components/tauler-app/contexts/formacions-context";
import { CalendarAvatar } from "../../../../standalone/calendar-avatar";
import { DropdownBorderlessButton } from "../../../../standalone/dropdown-borderless-button";
import { FixedTag } from "../../../../standalone/fixed-tag";
import { eventSearchFilter, timeRange } from "../../../../utils";
import { useAssajos, useEliminarAssaig } from "./hooks";

const { Item } = List;
const { Text } = Typography;

const LlistaAssajos = ({ filterValue, anteriors }) => {
  const formacions = useContext(FormacionsListContext);
  const [assajos, loading] = useAssajos();
  const [showDeleteConfirm] = useEliminarAssaig();

  const getDataSource = useCallback(() => {
    const list = anteriors
      ? assajos
          .filter((assaig) => moment(assaig.data_inici).isBefore(moment()))
          .sort((a, b) => moment(b.data_inici).diff(moment(a.data_inici)))
      : assajos.filter((assaig) =>
          moment().isSameOrBefore(moment(assaig.data_inici))
        );

    return filterValue.length > 0
      ? list.filter((assaig) =>
          eventSearchFilter(filterValue, {
            texts: [
              assaig.titol,
              ...assaig.formacions.map((formacio) => formacio.nom_curt),
              ...assaig.projectes.map((projecte) => projecte.titol),
              ...(assaig.hora_inici ? [] : ["Hora a determinar"]),
            ],
            dates: [
              assaig.data_inici,
              ...(assaig.data_final ? [assaig.data_final] : []),
            ],
          })
        )
      : list;
  }, [anteriors, assajos, filterValue]);

  return (
    <List
      dataSource={getDataSource()}
      loading={loading}
      renderItem={(assaig) => (
        <Item
          key={assaig.id_assaig}
          actions={[
            ...(formacions.length > 1 &&
            assaig.formacions &&
            assaig.formacions.length > 0
              ? [
                  <Space>
                    {assaig.formacions.map((formacio) => (
                      <IconFormacio
                        key={formacio.id_formacio}
                        name={formacio.nom_curt}
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
                    onClick: () => showDeleteConfirm(assaig.id_assaig),
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
  filterValue: PropTypes.string,
  anteriors: PropTypes.bool,
};

LlistaAssajos.defaultProps = {
  filterValue: "",
  anteriors: false,
};

export default LlistaAssajos;
