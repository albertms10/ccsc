import { List } from "antd";
import { FixedTagsProjectes } from "components/fixed-tags-projectes";
import { ModalButtonBaseProps } from "components/modal-button";
import { ModalList } from "components/modal-list";
import { SearchListBaseProps } from "components/search-list";
import { searchFilterAssaig } from "helpers/search-filters";
import { Assaig } from "model";
import moment from "moment";
import { useAssajos } from "pages/tauler/assajos/components/llista-assajos/hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { CalendarAvatar } from "standalone/calendar-avatar";
import { timeRange } from "utils";

interface ModalSeleccionarAssaigProps
  extends ModalButtonBaseProps,
    SearchListBaseProps {
  dataFilter: (value: Assaig, index: number, array: Assaig[]) => boolean;
  onItemClick: (item: Assaig) => Promise<void | Response>;
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
              ? [
                  <FixedTagsProjectes
                    key="fixed-tags-projectes"
                    projectes={assaig.projectes}
                    noLink
                  />,
                ]
              : []),
          ]}
        >
          <List.Item.Meta
            avatar={
              <CalendarAvatar
                moment={moment(assaig.datahora_inici)}
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
            {...(moment().isAfter(moment(assaig.data)) && {
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
