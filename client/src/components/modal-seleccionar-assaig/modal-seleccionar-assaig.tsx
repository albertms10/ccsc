import { List } from "antd";
import { FixedTagsProjectes } from "components/fixed-tags-projectes";
import { ModalButtonBaseProps } from "components/modal-button";
import { ModalList } from "components/modal-list";
import { SearchListBaseProps } from "components/search-list";
import { searchFilterAssaig } from "helpers/search-filters";
import { Assaig } from "model";
import dayjs from "dayjs";
import { useAssajos } from "pages/tauler/assajos/components/llista-assajos/hooks";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { CalendarAvatar } from "standalone/calendar-avatar";
import { useTimeRange } from "utils/datetime";

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

  const timeRange = useTimeRange();

  const [assajos, loading] = useAssajos();

  const renderItem = useCallback(
    (assaig, index, setVisible) => (
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
              dayjs={dayjs(assaig.datahora_inici)}
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
          {...(dayjs().isAfter(dayjs(assaig.data)) && {
            style: { opacity: 0.6 },
          })}
        />
      </List.Item>
    ),
    [onItemClick, thenAction, timeRange]
  );

  return (
    <ModalList<Assaig>
      title={t("select rehearsal")}
      dataSource={dataFilter ? assajos.filter(dataFilter) : assajos}
      searchPlaceholder={t("search rehearsals")}
      loading={loading}
      searchFilters={searchFilterAssaig}
      renderItem={renderItem}
      {...rest}
    />
  );
};

export default ModalSeleccionarAssaig;
