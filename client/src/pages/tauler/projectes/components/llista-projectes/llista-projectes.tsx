import { List, Space, Typography } from "antd";
import { Authorized } from "components/authorized";
import { IconsFormacions } from "components/icons-formacions";
import { FormacionsListContext } from "components/tauler-app/contexts/formacions-context";
import { useDeleteAPI } from "helpers";
import { searchFilterProjecte } from "helpers/search-filters";
import moment from "moment";
import React, { useCallback, useContext } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ColorCard } from "standalone/color-card";
import { DropdownBorderlessButton } from "standalone/dropdown-borderless-button";
import { fetchProjectes } from "store/projectes/thunks";
import { literalList, searchFilter } from "utils";
import { useProjectes } from "./hooks";
import "./llista-projectes.css";

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
  const dispatch = useDispatch();

  const formacions = useContext(FormacionsListContext);

  const [projectes, loading] = useProjectes();

  const [loadingDelete, showDeleteConfirm] = useDeleteAPI(
    "/projectes",
    "el projecte",
    () => dispatch(fetchProjectes())
  );

  const getDataSource = useCallback(() => {
    const list = inactius
      ? projectes
          .filter((projecte) => moment(projecte.data_final).isBefore(moment()))
          .sort((a, b) =>
            b.data_inici ? moment(b.data_inici).diff(moment(a.data_inici)) : 0
          )
      : projectes.filter(
          (projecte) =>
            !projecte.data_inici ||
            !projecte.data_final ||
            moment().isSameOrBefore(moment(projecte.data_final))
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
                    key: "eliminar",
                    action: "Eliminar",
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
                  {projecte.directors.length > 0 && (
                    <div>
                      <Text strong>Col·laboradors:</Text>{" "}
                      {literalList(projecte.directors.map(({ nom }) => nom))}
                    </div>
                  )}
                  {formacions.length > 1 && projecte.formacions.length > 0 && (
                    <div>
                      <Text strong>Formacions:</Text>{" "}
                      {literalList(
                        projecte.formacions.map(({ nom_curt }) => nom_curt)
                      )}
                    </div>
                  )}
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