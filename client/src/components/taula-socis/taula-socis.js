import { Grid, Input, Table, Typography } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { SociPropTypes } from "../../typedef/prop-types";
import { CellNomSoci } from "./components/cell-nom-soci";
import { DropdownRowSoci } from "./components/dropdown-row-soci";
import { useSearchSocis } from "./hooks";
import "./taula-socis.css";

const { Paragraph } = Typography;
const { Search } = Input;
const { useBreakpoint } = Grid;

const TaulaSocis = ({ socis, getSocis, loading }) => {
  const breakpoint = useBreakpoint();
  const [searchValue, setSearchValue, filteredSocis] = useSearchSocis(socis);

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
      onFilter: (value, record) => value === record.estat_actiu,
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
        <DropdownRowSoci idPersona={idPersona} getSocis={getSocis} />
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
        onChange={({ target }) => setSearchValue(target.value.toLowerCase())}
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <Table
        dataSource={searchValue ? filteredSocis : socis}
        rowKey="id_persona"
        loading={loading}
        pagination={{ hideOnSinglePage: true, responsive: true }}
        columns={getResponsiveColumns(breakpoint)}
      />
    </div>
  );
};

TaulaSocis.propTypes = {
  socis: PropTypes.arrayOf(SociPropTypes).isRequired,
  getSocis: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

TaulaSocis.defaultProps = {
  loading: false,
};

export default TaulaSocis;
