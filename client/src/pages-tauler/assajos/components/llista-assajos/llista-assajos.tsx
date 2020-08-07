import { List } from "antd";
import { Assaig } from "model";
import moment from "moment";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Authorized } from "../../../../components/authorized";
import { FixedTagsProjectes } from "../../../../components/fixed-tags-projectes";
import { IconsFormacions } from "../../../../components/icons-formacions";
import { FormacionsListContext } from "../../../../components/tauler-app/contexts/formacions-context";
import { useDeleteAPI } from "../../../../helpers";
import { searchFilterAssaig } from "../../../../helpers/search-filters";
import { CalendarAvatar } from "../../../../standalone/calendar-avatar";
import { DropdownBorderlessButton } from "../../../../standalone/dropdown-borderless-button";
import { fetchAssajos } from "../../../../store/assajos/thunks";
import { linkText, searchFilter, timeRange } from "../../../../utils";
import { useAssajos } from "./hooks";

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
              ? [<IconsFormacions formacions={assaig.formacions} />]
              : []),
            ...(assaig.projectes && assaig.projectes.length > 0
              ? [<FixedTagsProjectes projectes={assaig.projectes} />]
              : []),
            <Authorized>
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
              {...(anteriors && { style: { opacity: 0.6 } })}
            />
          </Link>
        </Item>
      )}
    />
  );
};

export default LlistaAssajos;
