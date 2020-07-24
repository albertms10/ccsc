import { List, Space } from "antd";
import { Assaig } from "model";
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { searchFilterAssaig } from "../../helpers/search-filters";
import { useAssajos } from "../../pages-tauler/assajos/components/llista-assajos/hooks";
import { CalendarAvatar } from "../../standalone/calendar-avatar";
import { fetchAssajos } from "../../store/assajos/thunks";
import { timeRange } from "../../utils";
import { FixedTagsProjectes } from "../fixed-tags-projectes";
import { ModalButtonBaseProps } from "../modal-button/modal-button";
import { ModalList } from "../modal-list";
import { SearchListBaseProps } from "../search-list/search-list";

interface ModalSeleccionarAssaigProps
  extends ModalButtonBaseProps,
    SearchListBaseProps {
  dataFilter: (value: Assaig, index: number, array: Assaig[]) => boolean;
  onItemClick: (item: Assaig) => Promise<any>;
}

const ModalSeleccionarAssaig: React.FC<ModalSeleccionarAssaigProps> = ({
  dataFilter,
  onItemClick,
  ...rest
}) => {
  const dispatch = useDispatch();

  const [assajos, loading] = useAssajos();

  return (
    <ModalList<Assaig>
      title="Selecciona un assaig"
      dataSource={dataFilter ? assajos.filter(dataFilter) : assajos}
      searchPlaceholder="Cerca assajos"
      loading={loading}
      searchFilters={searchFilterAssaig}
      renderItem={(assaig, index, setVisible) => (
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

export default ModalSeleccionarAssaig;
