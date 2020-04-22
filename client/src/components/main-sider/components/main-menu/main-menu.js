import React, { useContext, useEffect, useState } from "react";
import { Menu, Spin } from "antd";
import { Link, useLocation } from "react-router-dom";
import { kebabCase, nIndexOf } from "../../../../utils";
import "./main-menu.css";
import {
  HomeOutlined,
  LoadingOutlined,
  ScheduleOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  AgrupacionsContext,
  LoadingAgrupacionsContext,
} from "../../../tauler-app/tauler-app";
import { IconAgrupacio } from "../../../../icons";

const { SubMenu, Item, ItemGroup } = Menu;

export default ({ collapsed, setCollapsed }) => {
  const initialPaths = ["/", "/socis", "/reunions", "/pagaments"];

  const [menuPosition, setMenuPosition] = useState("");
  const [paths, setPaths] = useState(initialPaths);
  const [itemsAgrupacions, setItemsAgrupacions] = useState([]);

  const agrupacions = useContext(AgrupacionsContext);
  const loadingAgrupacions = useContext(LoadingAgrupacionsContext);

  const location = useLocation();

  // TODO Reorganitzar-ho en hooks propis
  const items = [
    {
      title: "Inici",
      icon: <HomeOutlined />,
      path: "/",
    },
    {
      key: "group1",
      title: "Agrupacions",
      loading: loadingAgrupacions,
      groupedItems: itemsAgrupacions,
    },
    {
      key: "group2",
      title: "Associació",
      groupedItems: [
        {
          title: "Socis",
          icon: <TeamOutlined />,
          path: "/socis",
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
    setPaths((prevPaths) =>
      prevPaths.splice(
        1,
        0,
        ...agrupacions.map((agrupacio) => "/" + kebabCase(agrupacio.nom_curt))
      )
    );

    setItemsAgrupacions(
      agrupacions.map((agrupacio) => ({
        title: agrupacio.nom_curt,
        icon: <IconAgrupacio name={agrupacio.nom_curt} />,
        path: "/" + kebabCase(agrupacio.nom_curt),
      }))
    );
  }, [agrupacions]);

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
  }, [location, paths]);

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
        item.groupedItems.map((item) => {
          if (item.hasOwnProperty("subItems")) return renderSubMenu(item);
          return renderItem(item);
        })
      )}
    </ItemGroup>
  );

  const renderSubMenu = (item) => (
    <SubMenu
      key={item.key}
      title={
        <span>
          {item.icon}
          <span>{item.title}</span>
        </span>
      }
    >
      {item.subItems.map(renderItem)}
    </SubMenu>
  );

  const renderItem = (item) => (
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
      defaultSelectedKeys={[menuPosition]}
      mode="inline"
      onClick={() => setCollapsed(true)}
    >
      {items.map((item) => {
        if (item.hasOwnProperty("groupedItems")) return renderGroup(item);
        else if (item.hasOwnProperty("subItems")) return renderSubMenu(item);
        return renderItem(item);
      })}
    </Menu>
  );
};
