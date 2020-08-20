import { Input, Table, Typography } from "antd";
import { ColumnsType } from "antd/lib/table/interface";
import { useDeleteAPI } from "helpers";
import { Soci } from "model";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { fetchSocis } from "store/socis/thunks";
import { searchFilter } from "utils";
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
  const { t } = useTranslation(["actions", "fields", "modals"]);

  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");

  const [loadingDelete, showDeleteConfirm] = useDeleteAPI(
    "/socis",
    t("the person"),
    () => dispatch(fetchSocis())
  );

  const columns: ColumnsType<object> = [
    {
      title: t("name"),
      dataIndex: "nom_complet",
      key: "nom_complet",
      render: (_, soci) => <CellNomSoci soci={soci as Soci} />,
      sorter: (a, b) =>
        (a as Soci).nom_complet.length - (b as Soci).nom_complet.length,
      sortDirections: ["descend", "ascend"],
      filters: [
        { text: t("common:active"), value: true },
        { text: t("common:inactive"), value: false },
      ],
      filterMultiple: false,
      onFilter: (value, soci) => value === (soci as Soci).es_actiu,
    },
    {
      title: t("email"),
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <Paragraph className="action-text" copyable>
          {text}
        </Paragraph>
      ),
      responsive: ["md"],
    },
    {
      title: t("phone"),
      dataIndex: "telefon",
      key: "telefon",
      responsive: ["lg"],
    },
    {
      title: "",
      dataIndex: "id_persona",
      key: "id_persona",
      align: "right",
      render: (idPersona) => (
        <DropdownRowSoci
          idPersona={idPersona}
          showDeleteConfirm={showDeleteConfirm}
        />
      ),
    },
  ];

  return (
    <div className="socis-table">
      <Search
        placeholder={t("search partners")}
        size="large"
        value={searchValue}
        onChange={({ target }) => setSearchValue(target.value)}
        allowClear
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <Table
        dataSource={
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
            : socis
        }
        rowKey="id_persona"
        loading={loading || loadingDelete}
        pagination={{ hideOnSinglePage: true, responsive: true }}
        columns={columns}
      />
    </div>
  );
};

export default TaulaSocis;
