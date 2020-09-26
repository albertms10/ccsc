import { Input, Table, Typography } from "antd";
import { ColumnsType, ColumnType } from "antd/lib/table";
import { useDeleteAPI } from "helpers";
import { Soci } from "model";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { fetchSocis } from "store/socis/thunks";
import { searchFilter } from "utils/misc";
import { CellNomSoci } from "./components/cell-nom-soci";
import { DropdownRowSoci } from "./components/dropdown-row-soci";
import "./taula-socis.css";

const { Paragraph } = Typography;
const { Search } = Input;

interface TaulaSocisProps {
  socis: Soci[];
  loading: boolean;
}

const TaulaSocis: React.FC<TaulaSocisProps> = ({ socis, loading = false }) => {
  const { t } = useTranslation(["fields", "actions", "modals"]);

  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");

  const [loadingDelete, showDeleteConfirm] = useDeleteAPI(
    "/socis",
    t("modals:the person"),
    () => dispatch(fetchSocis())
  );

  const columns = useMemo(
    () => [
      {
        title: t("name"),
        dataIndex: "nom_complet",
        key: "nom_complet",
        render(_, soci) {
          return <CellNomSoci soci={soci} />;
        },
        sorter: (a, b) => a.nom_complet.length - b.nom_complet.length,
        sortDirections: ["descend", "ascend"],
        filters: [
          { text: t("common:active"), value: true },
          { text: t("common:inactive"), value: false },
        ],
        filterMultiple: false,
        onFilter: (value, soci) => value === soci.es_actiu,
      } as ColumnType<Soci>,
      {
        title: t("email address"),
        dataIndex: "email",
        key: "email",
        render(text) {
          return (
            <Paragraph className="action-text" copyable>
              {text}
            </Paragraph>
          );
        },
        responsive: ["md"],
      } as ColumnType<string>,
      {
        title: t("phone"),
        dataIndex: "telefon",
        key: "telefon",
        responsive: ["lg"],
      } as ColumnType<string>,
      {
        title: "",
        dataIndex: "id_persona",
        key: "id_persona",
        align: "right",
        render(idPersona) {
          return (
            <DropdownRowSoci
              idPersona={idPersona}
              showDeleteConfirm={showDeleteConfirm}
            />
          );
        },
      } as ColumnType<number>,
    ],
    [showDeleteConfirm, t]
  ) /* TODO: (Un)necessary type assertion */ as ColumnsType<Soci>;

  const dataSource = useMemo(
    () =>
      searchValue.length > 0
        ? socis.filter((soci) =>
            searchFilter(searchValue, {
              texts: [
                soci.nom_complet,
                soci.username,
                soci.email,
                soci.telefon,
              ],
            })
          )
        : socis,
    [searchValue, socis]
  );

  return (
    <div className="socis-table">
      <Search
        placeholder={t("actions:search partners")}
        size="large"
        value={searchValue}
        onChange={({ target }) => setSearchValue(target.value)}
        allowClear
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <Table
        dataSource={dataSource}
        rowKey="id_persona"
        loading={loading || loadingDelete}
        pagination={{ hideOnSinglePage: true, responsive: true }}
        columns={columns}
      />
    </div>
  );
};

export default TaulaSocis;
