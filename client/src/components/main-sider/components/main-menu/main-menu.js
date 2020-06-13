import {
  BookOutlined,
  HomeOutlined,
  LoadingOutlined,
  ProjectOutlined,
  ReadOutlined,
  ScheduleOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Menu, Spin } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IconFormacio } from "../../../../assets/icons";
import { kebabCase, nIndexOf } from "../../../../utils";
import { Authorized } from "../../../authorized";
import {
  FormacionsListContext,
  LoadingFormacionsContext,
} from "../../../tauler-app/contexts/formacions-context";
import {
  SiderBrokenContext,
  SiderCollapsedContext,
  SiderSetCollapsedContext,
} from "../../../tauler-app/contexts/sider-context";
import "./main-menu.css";

const { Item, ItemGroup } = Menu;

export default () => {
  const initialPaths = [
    "/",
    "/socis",
    "/projectes",
    "/assajos",
    "/obres",
    "/reunions",
    "/pagaments",
  ];

  const [menuPosition, setMenuPosition] = useState("");
  const [paths, setPaths] = useState(initialPaths);
  const [itemsFormacions, setItemsFormacions] = useState([]);

  const formacions = useContext(FormacionsListContext);
  const loadingFormacions = useContext(LoadingFormacionsContext);
  const collapsed = useContext(SiderCollapsedContext);
  const setCollapsed = useContext(SiderSetCollapsedContext);
  const broken = useContext(SiderBrokenContext);

  const location = useLocation();

  // TODO Reorganitzar-ho en hooks propis
  /**
   * @typedef {Object} MenuItem
   * @property {string} title
   * @property {React.Component} icon
   * @property {string} path
   * @property {string} [authority]
   */

  /**
   * @typedef {Object} MenuGroup
   * @property {string} key
   * @property {string} title
   * @property {boolean} [loading]
   * @property {MenuItem[]} groupedItems
   */

  // TODO: Cal tenir els ítems del menú com a dades i després haver-les de processar?
  const items = [
    {
      title: "Inici",
      icon: <HomeOutlined />,
      path: "/",
    },
    {
      key: "grup_formacions",
      title: "Formacions",
      loading: loadingFormacions,
      groupedItems: itemsFormacions,
    },
    {
      key: "grup_gestio_musical",
      title: "Gestió musical",
      groupedItems: [
        {
          title: "Projectes",
          icon: <ProjectOutlined />,
          path: "/projectes",
        },
        {
          title: "Assajos",
          icon: <BookOutlined />,
          path: "/assajos",
        },
        {
          title: "Obres",
          icon: <ReadOutlined />,
          path: "/obres",
        },
      ],
    },
    {
      key: "grup_associacio",
      title: "Associació",
      groupedItems: [
        {
          title: "Socis",
          icon: <TeamOutlined />,
          path: "/socis",
          authority: "juntaDirectiva",
        },
        {
          title: "Reunions",
          icon: <SolutionOutlined />,
          path: "/reunions",
        },
        {
          title: "Pagaments",
          icon: <ScheduleOutlined />,
          path: "/pagaments",
        },
      ],
    },
  ];

  useEffect(() => {
    setPaths((prevPaths) => {
      prevPaths.splice(
        1,
        0,
        ...formacions.map((formacio) => "/" + kebabCase(formacio.nom_curt))
      );
      return prevPaths;
    });

    setItemsFormacions(
      formacions.map((formacio) => ({
        title: formacio.nom_curt,
        icon: <IconFormacio name={formacio.nom_curt} />,
        path: "/" + kebabCase(formacio.nom_curt),
      }))
    );
  }, [formacions]);

  useEffect(() => {
    setMenuPosition(
      paths.find((path) => {
        const numDirectories = path.split("/").length - 1;

        const getBasename = (pathname, n) => {
          const subPathsIndex = nIndexOf(location.pathname, "/", n);
          return subPathsIndex !== -1
            ? pathname.substr(0, subPathsIndex)
            : pathname;
        };

        return path === getBasename(location.pathname, numDirectories + 1);
      })
    );
  }, [location, paths, itemsFormacions]);

  /**
   * @param {MenuGroup} item
   * @returns {ItemGroup}
   */
  const renderGroup = (item) => (
    <ItemGroup
      key={item.key}
      className="main-menu-item-group"
      title={collapsed ? "" : item.title}
    >
      {item.loading ? (
        <Item>
          <Spin
            indicator={
              <LoadingOutlined
                style={{ color: "white", paddingLeft: "1rem" }}
              />
            }
          />
        </Item>
      ) : (
        item.groupedItems.map(renderItem)
      )}
    </ItemGroup>
  );

  // TODO: Refaccionar el menuItem per no haver-lo de repetir
  const renderItem = (/** MenuItem */ item) =>
    item.authority ? (
      <Authorized
        key={item.path}
        authority={item.authority}
        render={(props) => (
          <Item {...props} key={item.path}>
            <Link to={item.path}>
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </Item>
        )}
      />
    ) : (
      <Item key={item.path}>
        <Link to={item.path}>
          {item.icon}
          <span>{item.title}</span>
        </Link>
      </Item>
    );

  return (
    <Menu
      className="main-menu"
      theme="dark"
      selectedKeys={[menuPosition]}
      mode="inline"
      onClick={() => {
        if (broken) setCollapsed(true);
      }}
    >
      {items.map((/** MenuItem */ item) => {
        if (item.hasOwnProperty("groupedItems")) return renderGroup(item);
        return renderItem(item);
      })}
    </Menu>
  );
};
