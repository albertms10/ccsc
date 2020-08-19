import { List } from "antd";
import { Assaig } from "model";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { searchFilterAssaig } from "../../helpers/search-filters";
import { useAssajos } from "../../pages-tauler/assajos/components/llista-assajos/hooks";
import { CalendarAvatar } from "../../standalone/calendar-avatar";
import { timeRange } from "../../utils";
import { FixedTagsProjectes } from "../fixed-tags-projectes";
import { ModalButtonBaseProps } from "../modal-button";
import { ModalList } from "../modal-list";
import { SearchListBaseProps } from "../search-list";

interface ModalSeleccionarAssaigProps
  extends ModalButtonBaseProps,
    SearchListBaseProps {
  dataFilter: (value: Assaig, index: number, array: Assaig[]) => boolean;
  onItemClick: (item: Assaig) => Promise<any>;
  thenAction?: () => void;
}

const ModalSeleccionarAssaig: React.FC<ModalSeleccionarAssaigProps> = ({
  dataFilter,
  onItemClick,
  thenAction,
  ...rest
}) => {
  const { t } = useTranslation("actions");

  const [assajos, loading] = useAssajos();

  return (
    <ModalList<Assaig>
      title={t("select rehearsal")}
      dataSource={dataFilter ? assajos.filter(dataFilter) : assajos}
      searchPlaceholder={t("search rehearsals")}
      loading={loading}
      searchFilters={searchFilterAssaig}
      renderItem={(assaig, index, setVisible) => (
        <List.Item
          onClick={() => {
            onItemClick(assaig).then(() => {
              if (typeof thenAction === "function") thenAction();
              setVisible(false);
            });
          }}
          actions={[
            ...(assaig.projectes && assaig.projectes.length > 0
              ? [<FixedTagsProjectes projectes={assaig.projectes} noLink />]
              : []),
          ]}
        >
          <List.Item.Meta
            avatar={
              <CalendarAvatar
                moment={moment(assaig.data_inici)}
                style={{
                  transform: "scale(1.25)",
                  position: "relative",
                  top: 8,
                }}
              />
            }
            title={assaig.titol}
            description={timeRange(assaig.hora_inici, assaig.hora_final, {
              textual: true,
            })}
            {...(moment().isAfter(moment(assaig.data_inici)) && {
              style: { opacity: 0.6 },
            })}
          />
        </List.Item>
      )}
      {...rest}
    />
  );
};

export default ModalSeleccionarAssaig;
