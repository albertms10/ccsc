import { List, Space, Typography } from "antd";
import { Authorized } from "components/authorized";
import { IconsFormacions } from "components/icons-formacions";
import { FormacionsListContext } from "components/tauler-app/contexts/formacions-context";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useDeleteAPI } from "helpers";
import { searchFilterProjecte } from "helpers/search-filters";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ColorCard } from "standalone/color-card";
import { DropdownBorderlessButton } from "standalone/dropdown-borderless-button";
import { fetchProjectes } from "store/projectes/thunks";
import { literalList } from "utils/lists";
import { searchFilter } from "utils/misc";
import { useProjectes } from "./hooks";
import "./llista-projectes.css";

dayjs.extend(isSameOrBefore);

const { Item } = List;
const { Text } = Typography;

interface LlistaProjectesProps {
  searchValue: string;
  inactius?: boolean;
}

const LlistaProjectes: React.FC<LlistaProjectesProps> = ({
  searchValue,
  inactius = false,
}) => {
  const { t } = useTranslation("dashboard");

  const dispatch = useDispatch();

  const formacions = useContext(FormacionsListContext);

  const [projectes, loading] = useProjectes();

  const [loadingDelete, showDeleteConfirm] = useDeleteAPI(
    "/projectes",
    t("modals:the project"),
    () => dispatch(fetchProjectes())
  );

  const getDataSource = useCallback(() => {
    const list = inactius
      ? projectes
          .filter((projecte) => dayjs(projecte.data_final).isBefore(dayjs()))
          .sort((a, b) =>
            b.data_inici ? dayjs(b.data_inici).diff(dayjs(a.data_inici)) : 0
          )
      : projectes.filter(
          (projecte) =>
            !projecte.data_inici ||
            !projecte.data_final ||
            dayjs().isSameOrBefore(dayjs(projecte.data_final))
        );

    return searchValue.length > 0
      ? list.filter((projecte) =>
          searchFilter(searchValue, searchFilterProjecte(projecte))
        )
      : list;
  }, [inactius, projectes, searchValue]);

  return (
    <List
      loading={loading || loadingDelete}
      dataSource={getDataSource()}
      renderItem={(projecte) => (
        <Item
          key={projecte.id_projecte}
          actions={[
            ...(formacions.length > 1 &&
            projecte.formacions &&
            projecte.formacions.length > 0
              ? [
                  <IconsFormacions
                    key="icons-formacions"
                    formacions={projecte.formacions}
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
                    onClick: () => showDeleteConfirm(projecte.id_projecte),
                  },
                ]}
              />
            </Authorized>,
          ]}
        >
          <Link to={`/projectes/${projecte.id_projecte}`}>
            <Item.Meta
              avatar={
                <ColorCard hoverable={false} color={`#${projecte.color}`} />
              }
              title={projecte.titol}
              description={
                <Space direction="vertical">
                  {[
                    ...(projecte.directors.length > 0
                      ? [
                          <div key="collaborators">
                            <Text strong>
                              {t(
                                projecte.directors.length === 1
                                  ? "collaborator"
                                  : "collaborators"
                              )}
                              :
                            </Text>{" "}
                            {literalList(
                              projecte.directors.map(({ nom }) => nom)
                            )}
                          </div>,
                        ]
                      : []),
                    ...(formacions.length > 1 && projecte.formacions.length > 0
                      ? [
                          <div key="formations">
                            <Text strong>
                              {t(
                                projecte.formacions.length === 1
                                  ? "formation"
                                  : "formations"
                              )}
                              :
                            </Text>{" "}
                            {literalList(
                              projecte.formacions.map(
                                ({ nom_curt }) => nom_curt
                              )
                            )}
                          </div>,
                        ]
                      : []),
                  ]}
                </Space>
              }
              {...(inactius && { style: { opacity: 0.6 } })}
            />
          </Link>
        </Item>
      )}
    />
  );
};

export default LlistaProjectes;
