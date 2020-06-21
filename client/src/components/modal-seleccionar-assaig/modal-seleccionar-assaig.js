import { List, Space } from "antd";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchFilterAssaig } from "../../helpers/search-filters";
import { fetchAssajos } from "../../redux/assajos/assajos-actions";
import { CalendarAvatar } from "../../standalone/calendar-avatar";
import { timeRange } from "../../utils";
import FixedTagsProjectes from "../fixed-tags-projectes/fixed-tags-projectes";
import ModalList from "../modal-list/modal-list";

const ModalSeleccionarAssaig = ({ dataFilter, onItemClick, ...rest }) => {
  const dispatch = useDispatch();
  const { assajos, fetched } = useSelector(({ assajos }) => assajos);

  useEffect(() => {
    if (!fetched) dispatch(fetchAssajos());
  }, [fetched, dispatch]);

  return (
    <ModalList
      title="Selecciona un assaig"
      dataSource={dataFilter ? assajos.filter(dataFilter) : assajos}
      searchPlaceholder="Cerca assajos"
      searchFilters={searchFilterAssaig}
      renderItem={(assaig, setVisible) => (
        <List.Item
          onClick={() => {
            onItemClick(assaig).then(() => {
              dispatch(fetchAssajos());
              setVisible(false);
            });
          }}
          actions={[
            ...(assaig.projectes && assaig.projectes.length > 0
              ? [<FixedTagsProjectes projectes={assaig.projectes} />]
              : []),
          ]}
        >
          <Space
            size="large"
            {...(moment().isAfter(moment(assaig.data_inici)) && {
              style: { opacity: 0.6 },
            })}
          >
            <CalendarAvatar
              moment={moment(assaig.data_inici)}
              style={{
                transform: "scale(1.25)",
                position: "relative",
                left: "5px",
              }}
            />
            <List.Item.Meta
              title={assaig.titol}
              description={timeRange(assaig.hora_inici, assaig.hora_final, {
                textual: true,
              })}
            />
          </Space>
        </List.Item>
      )}
      {...rest}
    />
  );
};

ModalSeleccionarAssaig.propTypes = {
  loading: PropTypes.bool,
  dataFilter: PropTypes.func,
  onItemClick: PropTypes.func.isRequired,
};

export default ModalSeleccionarAssaig;
