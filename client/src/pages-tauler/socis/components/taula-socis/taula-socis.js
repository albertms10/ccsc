import { ExclamationCircleOutlined, MoreOutlined } from "@ant-design/icons";
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
import React from "react";
import Media from "react-media";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAPI } from "../../../../helpers";
import { BorderlessButton } from "../../../../standalone/borderless-button";
import { closestTimeValue } from "../../../../utils";
import { useSearchSocis } from "./hooks";
import "./taula-socis.css";

const { Text, Paragraph } = Typography;
const { Search } = Input;

export default ({ socis, getSocis, loading }) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue, filteredSocis] = useSearchSocis(socis);

  const columns = [
    {
      title: "Nom",
      dataIndex: "nom_complet",
      key: "nom_complet",
      render: (text, row) => (
        <Link to={`/socis/${row.id_persona}`}>
          <div className="socis-table-username-wrapper">
            <Tooltip
              title={`${closestTimeValue(row.dies_activitat, "d")} d’${
                row.data_inactiu ? "in" : ""
              }activitat`}
            >
              <Badge dot status={row.estat_actiu ? "success" : "danger"}>
                <Avatar className="socis-table-avatar">
                  {row.nom.charAt(0)}
                  {row.cognoms.charAt(0)}
                </Avatar>
              </Badge>
            </Tooltip>
            <div className="socis-table-username-container">
              <Text className="socis-table-username-text">{text}</Text>
              <Text className="socis-table-username-text" type="secondary">
                {row.username}
              </Text>
            </div>
          </div>
        </Link>
      ),
      sorter: (a, b) => a.nom_complet.length - b.nom_complet.length,
      sortDirections: ["descend", "ascend"],
      filters: [
        { text: "Actiu", value: 1 },
        { text: "Inactiu", value: 0 },
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
      hideOnSmall: true,
    },
    {
      title: "Telèfon",
      dataIndex: "telefon",
      key: "telefon",
      hideOnMedium: true,
    },
    {
      title: "",
      dataIndex: "id_persona",
      key: "id_persona",
      align: "right",
      render: (idPersona) => (
        <Dropdown
          placement="bottomRight"
          trigger="click"
          overlay={
            <Menu>
              <Menu.Item>
                <Link to={`/socis/${idPersona}`}>Detalls</Link>
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

  const handleEliminar = (id) => {
    fetchAPI(`/api/socis/${id}`, () => getSocis(), dispatch, {
      method: "DELETE",
    });
  };

  const getResponsiveColumns = ({ small, medium }) =>
    columns.filter(
      ({ hideOnSmall = false, hideOnMedium = false }) =>
        !(small && hideOnSmall) && !(medium && hideOnMedium)
    );

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
    <div className="socis-table">
      <Search
        placeholder="Cerca socis"
        size="large"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value.toLowerCase());
        }}
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <Media queries={{ small: { maxWidth: 599 }, medium: { maxWidth: 999 } }}>
        {(matches) => (
          <Table
            dataSource={searchValue ? filteredSocis : socis}
            rowKey="id_persona"
            loading={loading}
            pagination={{ hideOnSinglePage: true, responsive: true }}
            columns={getResponsiveColumns(matches)}
          />
        )}
      </Media>
    </div>
  );
};
