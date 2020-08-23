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
import { IconFormacio } from "assets/icons";
import { Authorized } from "components/authorized";
import {
  FormacionsListContext,
  LoadingFormacionsContext,
} from "components/tauler-app/contexts/formacions-context";
import {
  SiderBrokenContext,
  SiderSetCollapsedContext,
} from "components/tauler-app/contexts/sider-context";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { basenameFromPath, linkText } from "utils";
import { MainMenuItem } from "../menu-item";
import { MainMenuItemGroup } from "../menu-item-group";
import "./main-menu.css";

interface RouteProps {
  key: string;
  path: string;
  title: string;
}

const getRouteProps = (title: string): RouteProps => {
  const path = `/${linkText(title)}`;
  return {
    key: path,
    path,
    title,
  };
};

const MainMenu: React.FC = () => {
  const { t } = useTranslation("dashboard");

  const initialPaths = useMemo(
    () =>
      [
        "",
        t("projects"),
        t("rehearsals"),
        t("works"),
        t("partners"),
        t("meetings"),
        t("payments"),
      ].map((path) => `/${linkText(path)}`),
    [t]
  );

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
          ...formacions.map(({ nom_curt }) => `/${linkText(nom_curt)}`)
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
      <MainMenuItem
        title={t("home")}
        icon={<HomeOutlined />}
        key="/"
        path="/"
      />
      <MainMenuItemGroup
        key="grup_formacions"
        title={t("formations")}
        loading={loadingFormacions}
      >
        {formacions &&
          formacions.map(({ nom_curt }) => {
            const path = `/${linkText(nom_curt)}`;
            return (
              <MainMenuItem
                title={nom_curt}
                icon={<IconFormacio name={nom_curt} />}
                key={path}
                path={path}
              />
            );
          })}
      </MainMenuItemGroup>
      <MainMenuItemGroup
        key="grup_gestio_musical"
        title={t("musical management")}
      >
        <MainMenuItem
          {...getRouteProps(t("projects"))}
          icon={<ProjectOutlined />}
        />
        <MainMenuItem
          {...getRouteProps(t("rehearsals"))}
          icon={<BookOutlined />}
        />
        <MainMenuItem {...getRouteProps(t("works"))} icon={<ReadOutlined />} />
      </MainMenuItemGroup>
      <MainMenuItemGroup key="grup_entitat" title={t("entity")}>
        <Authorized
          authority="junta_directiva"
          {...getRouteProps(t("partners"))}
          render={(props) => (
            // TODO: Infer props from getRouteProps
            <MainMenuItem key="" path="" {...props} icon={<TeamOutlined />} />
          )}
        />
        <MainMenuItem
          {...getRouteProps(t("meetings"))}
          icon={<SolutionOutlined />}
        />
        <MainMenuItem
          {...getRouteProps(t("payments"))}
          icon={<ScheduleOutlined />}
        />
      </MainMenuItemGroup>
    </Menu>
  );
};

export default MainMenu;
