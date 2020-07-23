import {
  BookOutlined,
  HomeOutlined,
  ProjectOutlined,
  ReadOutlined,
  ScheduleOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IconFormacio } from "../../../../assets/icons";
import { basenameFromPath, kebabCase } from "../../../../utils";
import { Authorized } from "../../../authorized";
import {
  FormacionsListContext,
  LoadingFormacionsContext,
} from "../../../tauler-app/contexts/formacions-context";
import {
  SiderBrokenContext,
  SiderSetCollapsedContext,
} from "../../../tauler-app/contexts/sider-context";
import { MenuItem } from "../menu-item";
import { MenuItemGroup } from "../menu-item-group";
import "./main-menu.css";

const initialPaths = [
  "/",
  "/socis",
  "/projectes",
  "/assajos",
  "/obres",
  "/reunions",
  "/pagaments",
];

interface MenuItem {
  title: string;
  icon: JSX.Element;
  path: string;
}

const MainMenu: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState("");
  const [paths, setPaths] = useState(initialPaths);

  const formacions = useContext(FormacionsListContext);
  const loadingFormacions = useContext(LoadingFormacionsContext);
  const setCollapsed = useContext(SiderSetCollapsedContext);
  const broken = useContext(SiderBrokenContext);

  const location = useLocation();

  useEffect(() => {
    if (formacions.length > 0)
      setPaths((prevPaths) => {
        prevPaths.splice(
          1,
          0,
          ...formacions.map(({ nom_curt }) => "/" + kebabCase(nom_curt))
        );
        return prevPaths;
      });
  }, [formacions]);

  useEffect(() => {
    setSelectedKey(
      paths.find(
        (path) =>
          path === basenameFromPath(location.pathname, path.split("/").length)
      ) || ""
    );
  }, [location, paths]);

  return (
    <Menu
      className="main-menu"
      theme="dark"
      selectedKeys={[selectedKey]}
      mode="inline"
      onClick={() => {
        if (broken) setCollapsed(true);
      }}
    >
      <MenuItem title="Inici" icon={<HomeOutlined />} path="/" />
      <MenuItemGroup
        key="grup_formacions"
        title="Formacions"
        loading={loadingFormacions}
      >
        {formacions &&
          formacions.map(({ nom_curt }) => (
            <MenuItem
              title={nom_curt}
              icon={<IconFormacio name={nom_curt} />}
              path={"/" + kebabCase(nom_curt)}
            />
          ))}
      </MenuItemGroup>
      <MenuItemGroup key="grup_gestio_musical" title="Gestió musical">
        <MenuItem
          title="Projectes"
          icon={<ProjectOutlined />}
          path="/projectes"
        />
        <MenuItem title="Assajos" icon={<BookOutlined />} path="/assajos" />
        <MenuItem title="Obres" icon={<ReadOutlined />} path="/obres" />
      </MenuItemGroup>
      <MenuItemGroup key="grup_entitat" title="Entitat">
        <Authorized
          authority="junta_directiva"
          render={(props) => (
            <MenuItem
              {...props}
              title="Socis"
              icon={<TeamOutlined />}
              path="/socis"
            />
          )}
        />
        <MenuItem
          title="Reunions"
          icon={<SolutionOutlined />}
          path="/reunions"
        />
        <MenuItem
          title="Pagaments"
          icon={<ScheduleOutlined />}
          path="/pagaments"
        />
      </MenuItemGroup>
    </Menu>
  );
};

export default MainMenu;
