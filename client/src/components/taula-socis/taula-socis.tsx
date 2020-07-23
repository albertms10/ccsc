import { Input, Table, Typography } from "antd";
import { ColumnsType } from "antd/lib/table/interface";
import { Soci } from "model";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useDeleteAPI } from "../../helpers";
import { fetchSocis } from "../../store/socis/thunks";
import { searchFilter } from "../../utils";
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
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");

  const [loadingDelete, showDeleteConfirm] = useDeleteAPI(
    "/socis",
    "la persona",
    () => dispatch(fetchSocis())
  );

  const columns: ColumnsType<object> = [
    {
      title: "Nom",
      dataIndex: "nom_complet",
      key: "nom_complet",
      render: (_, soci) => <CellNomSoci soci={soci as Soci} />,
      sorter: (a, b) =>
        (a as Soci).nom_complet.length - (b as Soci).nom_complet.length,
      sortDirections: ["descend", "ascend"],
      filters: [
        { text: "Actiu", value: true },
        { text: "Inactiu", value: false },
      ],
      filterMultiple: false,
      onFilter: (value, soci) => value === (soci as Soci).es_actiu,
    },
    {
      title: "Adreça electrònica",
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
      title: "Telèfon",
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
        placeholder="Cerca socis"
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
