import { List, Space, Typography } from "antd";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { Authorized } from "../../../../components/authorized";
import { FixedTagsProjectes } from "../../../../components/fixed-tags-projectes";
import { IconsFormacions } from "../../../../components/icons-formacions";
import { FormacionsListContext } from "../../../../components/tauler-app/contexts/formacions-context";
import { CalendarAvatar } from "../../../../standalone/calendar-avatar";
import { DropdownBorderlessButton } from "../../../../standalone/dropdown-borderless-button";
import { eventSearchFilter, timeRange } from "../../../../utils";
import { useAssajos, useEliminarAssaig } from "./hooks";

const { Item } = List;
const { Text } = Typography;

const LlistaAssajos = ({ idProjecte, searchValue, anteriors = false }) => {
  const formacions = useContext(FormacionsListContext);
  const [assajos, loading] = useAssajos();
  const [showDeleteConfirm] = useEliminarAssaig();

  const getDataSource = useCallback(() => {
    let list = anteriors
      ? assajos
          .filter((assaig) =>
            moment(assaig.data_final || assaig.data_inici).isBefore(moment())
          )
          .sort((a, b) => moment(b.data_inici).diff(moment(a.data_inici)))
      : assajos.filter((assaig) =>
          moment().isSameOrBefore(
            moment(assaig.data_final || assaig.data_inici)
          )
        );

    if (idProjecte)
      list = list.filter((assaig) =>
        assaig.projectes.find(
          (projecte) => projecte.id_projecte === parseInt(idProjecte)
        )
      );

    return searchValue.length > 0
      ? list.filter((assaig) =>
          eventSearchFilter(searchValue, {
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
  }, [anteriors, assajos, idProjecte, searchValue]);

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
              ? [<IconsFormacions formacions={assaig.formacions} />]
              : []),
            ...(assaig.projectes && assaig.projectes.length > 0
              ? [<FixedTagsProjectes projectes={assaig.projectes} />]
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
                description={timeRange(assaig.hora_inici, assaig.hora_final, {
                  textual: true,
                })}
              />
            </Space>
          </Link>
        </Item>
      )}
    />
  );
};

LlistaAssajos.propTypes = {
  idProjecte: PropTypes.any,
  searchValue: PropTypes.string.isRequired,
  anteriors: PropTypes.bool,
};

export default LlistaAssajos;
