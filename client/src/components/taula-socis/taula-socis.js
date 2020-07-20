import { Grid, Input, Table, Typography } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useDeleteAPI } from "../../helpers";
import { fetchSocis } from "../../store/socis/thunks";
import { SociPropTypes } from "../../typedef/prop-types-definitions";
import { searchFilter } from "../../utils";
import { CellNomSoci } from "./components/cell-nom-soci";
import { DropdownRowSoci } from "./components/dropdown-row-soci";
import "./taula-socis.css";

const { Paragraph } = Typography;
const { Search } = Input;

const TaulaSocis = ({ socis, loading = false }) => {
  const dispatch = useDispatch();
  const breakpoint = Grid.useBreakpoint();

  const [searchValue, setSearchValue] = useState("");

  const [loadingDelete, showDeleteConfirm] = useDeleteAPI(
    "/socis",
    "la persona",
    () => dispatch(fetchSocis())
  );

  const columns = [
    {
      title: "Nom",
      dataIndex: "nom_complet",
      key: "nom_complet",
      render: (_, soci) => <CellNomSoci soci={soci} />,
      sorter: (a, b) => a.nom_complet.length - b.nom_complet.length,
      sortDirections: ["descend", "ascend"],
      filters: [
        { text: "Actiu", value: true },
        { text: "Inactiu", value: false },
      ],
      filterMultiple: false,
      onFilter: (value, soci) => value === soci.es_actiu,
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
      hideBreakpoint: "sm",
    },
    {
      title: "Telèfon",
      dataIndex: "telefon",
      key: "telefon",
      hideBreakpoint: "md",
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

  const getResponsiveColumns = (breakpoint) =>
    columns.filter(
      ({ hideBreakpoint }) =>
        !(!breakpoint.md && hideBreakpoint === "sm") &&
        !(!breakpoint.lg && hideBreakpoint === "md")
    );

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
        columns={getResponsiveColumns(breakpoint)}
      />
    </div>
  );
};

TaulaSocis.propTypes = {
  socis: PropTypes.arrayOf(SociPropTypes).isRequired,
  loading: PropTypes.bool,
};

export default TaulaSocis;
