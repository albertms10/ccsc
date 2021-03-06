import { List } from "antd";
import { Authorized } from "components/authorized";
import { FixedTagsProjectes } from "components/fixed-tags-projectes";
import { IconsFormacions } from "components/icons-formacions";
import { FormacionsListContext } from "components/tauler-app/contexts/formacions-context";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useDeleteAPI } from "helpers";
import { searchFilterAssaig } from "helpers/search-filters";
import { Assaig } from "model";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CalendarAvatar } from "standalone/calendar-avatar";
import { DropdownBorderlessButton } from "standalone/dropdown-borderless-button";
import { fetchAssajos } from "store/assajos/thunks";
import { useTimeRange } from "utils/datetime";
import { searchFilter } from "utils/misc";
import { linkText } from "utils/strings";
import { useAssajos } from "./hooks";

dayjs.extend(isSameOrBefore);

const { Item } = List;

interface LlistaAssajosProps {
  idProjecte?: number;
  searchValue: string;
  anteriors?: boolean;
}

const LlistaAssajos: React.FC<LlistaAssajosProps> = ({
  idProjecte,
  searchValue,
  anteriors = false,
}) => {
  const { t } = useTranslation("dashboard");

  const dispatch = useDispatch();
  const timeRange = useTimeRange();

  const formacions = useContext(FormacionsListContext);

  const [assajos, loading] = useAssajos();

  const [loadingDelete, showDeleteConfirm] = useDeleteAPI(
    "/assajos",
    t("modals:the rehearsal"),
    () => dispatch(fetchAssajos())
  );

  const getDataSource = useCallback((): Assaig[] => {
    let list: Assaig[] = anteriors
      ? assajos
          .filter((assaig) =>
            dayjs(assaig.datahora_final || assaig.datahora_inici).isBefore(
              dayjs()
            )
          )
          .sort((a, b) => dayjs(b.datahora_inici).diff(dayjs(a.datahora_inici)))
      : assajos.filter((assaig) =>
          dayjs().isSameOrBefore(
            dayjs(assaig.datahora_final || assaig.datahora_inici)
          )
        );

    if (idProjecte)
      list = list.filter((assaig) =>
        assaig.projectes.find((projecte) => projecte.id_projecte === idProjecte)
      );

    return searchValue.length > 0
      ? list.filter((assaig) =>
          searchFilter(searchValue, searchFilterAssaig(assaig))
        )
      : list;
  }, [anteriors, assajos, idProjecte, searchValue]);

  return (
    <List
      dataSource={getDataSource()}
      loading={loading || loadingDelete}
      renderItem={(assaig) => (
        <Item
          key={assaig.id_assaig}
          actions={[
            ...(formacions.length > 1 &&
            assaig.formacions &&
            assaig.formacions.length > 0
              ? [
                  <IconsFormacions
                    key="icons-formacio"
                    formacions={assaig.formacions}
                  />,
                ]
              : []),
            ...(assaig.projectes && assaig.projectes.length > 0
              ? [
                  <FixedTagsProjectes
                    key="fixed-tags-projectes"
                    projectes={assaig.projectes}
                  />,
                ]
              : []),
            <Authorized key="more_options">
              <DropdownBorderlessButton
                items={[
                  {
                    key: t("common:delete"),
                    action: t("common:delete"),
                    danger: true,
                    onClick: () => showDeleteConfirm(assaig.id_assaig),
                  },
                ]}
              />
            </Authorized>,
          ]}
        >
          <Link to={`/${linkText(t("rehearsals"))}/${assaig.id_assaig}`}>
            <Item.Meta
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
              {...(anteriors && { style: { opacity: 0.6 } })}
            />
          </Link>
        </Item>
      )}
    />
  );
};

export default LlistaAssajos;
