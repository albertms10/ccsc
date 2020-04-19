import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Dropdown,
  Input,
  Menu,
  Modal,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { ExclamationCircleOutlined, MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Media from "react-media";
import { closestTimeValue } from "../../utils";

import "./taula-socis.css";
import { BorderlessButton } from "../../standalone/borderless-button";

const { Text, Paragraph } = Typography;
const { Search } = Input;

export default ({ socis, getSocis, loading }) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredSocis, setFilteredSocis] = useState(socis);

  const columns = [
    {
      title: "Nom",
      dataIndex: "nom_complet",
      key: "nom_complet",
      render: (text, row) => (
        <>
          <Avatar style={{ marginRight: "1rem", marginBottom: "-1.25rem" }}>
            {row.nom[0]}
            {row.cognoms[0]}
          </Avatar>
          <div style={{ display: "inline-grid" }}>
            <Text style={{ marginBottom: 0 }}>{text}</Text>
            <Text type="secondary" style={{ marginBottom: 0 }}>
              {row.username}
            </Text>
          </div>
        </>
      ),
      sorter: (a, b) => a.nom_complet.length - b.nom_complet.length,
      sortDirections: ["descend", "ascend"],
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
      hideOnSmall: true,
    },
    {
      title: "Telèfon",
      dataIndex: "telefon",
      key: "telefon",
      hideOnSmall: true,
    },
    {
      title: "Estat",
      dataIndex: "estat_actiu",
      key: "estat",
      render: (estat_actiu, row) => (
        <Tooltip
          title={`${closestTimeValue(row.dies_activitat, "d")} d’${
            row.data_inactiu ? "in" : ""
          }activitat`}
        >
          {!estat_actiu || row.data_inactiu ? (
            <Badge status="error" text="Inactiu" />
          ) : (
            <Badge status="success" text="Actiu" />
          )}
        </Tooltip>
      ),
      filters: [
        { text: "Actiu", value: 1 },
        { text: "Inactiu", value: 0 },
      ],
      filterMultiple: false,
      onFilter: (value, record) => value === record.estat_actiu,
    },
    {
      title: "",
      dataIndex: "id_persona",
      key: "id_persona",
      align: "right",
      render: (idPersona, row) => (
        <Dropdown
          placement="bottomRight"
          overlay={
            <Menu>
              <Menu.Item>
                <Link to={`/socis/${row.username}`}>Detalls</Link>
              </Menu.Item>
              <Menu.Item onClick={() => showDeleteConfirm(idPersona)}>
                <Text type="danger">Eliminar</Text>
              </Menu.Item>
            </Menu>
          }
        >
          <BorderlessButton shape="circle" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  useEffect(() => {
    const filteredSocis = socis.filter((soci) => {
      return (
        soci.nom_complet.toLowerCase().includes(searchValue) ||
        soci.username.includes(searchValue) ||
        soci.email.includes(searchValue) ||
        (soci.telefon ? soci.telefon.includes(searchValue) : "")
      );
    });
    setFilteredSocis(filteredSocis);
  }, [searchValue, socis]);

  const handleEliminar = (id) => {
    fetch(`/api/socis/${id}`, { method: "DELETE" }).then(() => getSocis());
  };

  const getResponsiveColumns = (smallScreen) =>
    columns.filter(({ hideOnSmall = false }) => !(smallScreen && hideOnSmall));

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title:
        "Confirmes que vols eliminar el soci i totes les dades associades?",
      icon: <ExclamationCircleOutlined />,
      content: "Aquesta acció no es pot desfer.",
      okText: "Elimina",
      okButtonProps: { type: "danger" },
      onOk: () => handleEliminar(id),
      onCancel: () => {},
    });
  };

  return (
    <>
      <Search
        placeholder="Cerca socis"
        size="large"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value.toLowerCase());
        }}
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <Media query="(max-width: 999px)">
        {(smallScreen) => (
          <Table
            dataSource={searchValue ? filteredSocis : socis}
            rowKey="id_persona"
            loading={loading}
            pagination={{ hideOnSinglePage: true, responsive: true }}
            style={{ border: "1px solid #eee" }}
            columns={getResponsiveColumns(smallScreen)}
          />
        )}
      </Media>
    </>
  );
};
