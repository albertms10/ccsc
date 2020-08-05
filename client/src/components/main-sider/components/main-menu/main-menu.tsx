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
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { IconFormacio } from "../../../../assets/icons";
import { basenameFromPath, linkText } from "../../../../utils";
import { Authorized } from "../../../authorized";
import {
  FormacionsListContext,
  LoadingFormacionsContext,
} from "../../../tauler-app/contexts/formacions-context";
import {
  SiderBrokenContext,
  SiderSetCollapsedContext,
} from "../../../tauler-app/contexts/sider-context";
import { MainMenuItem } from "../menu-item";
import { MainMenuItemGroup } from "../menu-item-group";
import "./main-menu.css";

const MainMenu: React.FC = () => {
  const { t } = useTranslation("dashboard");

  const initialPaths = useMemo(
    () =>
      [
        "",
        t("partners"),
        t("projects"),
        t("rehearsals"),
        t("works"),
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
          ...formacions.map(({ nom_curt }) => "/" + linkText(nom_curt))
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
      <MainMenuItem title="Inici" icon={<HomeOutlined />} key="/" path="/" />
      <MainMenuItemGroup
        key="grup_formacions"
        title="Formacions"
        loading={loadingFormacions}
      >
        {formacions &&
          formacions.map(({ nom_curt }) => {
            const path = "/" + linkText(nom_curt);
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
      <MainMenuItemGroup key="grup_gestio_musical" title="Gestió musical">
        <MainMenuItem
          title="Projectes"
          icon={<ProjectOutlined />}
          key="/projectes"
          path="/projectes"
        />
        <MainMenuItem
          title="Assajos"
          icon={<BookOutlined />}
          key="/assajos"
          path="/assajos"
        />
        <MainMenuItem
          title="Obres"
          icon={<ReadOutlined />}
          key="/obres"
          path="/obres"
        />
      </MainMenuItemGroup>
      <MainMenuItemGroup key="grup_entitat" title="Entitat">
        <Authorized
          key="/socis"
          authority="junta_directiva"
          render={(props) => (
            <MainMenuItem
              {...props}
              title="Socis"
              icon={<TeamOutlined />}
              path="/socis"
            />
          )}
        />
        <MainMenuItem
          title="Reunions"
          icon={<SolutionOutlined />}
          key="/reunions"
          path="/reunions"
        />
        <MainMenuItem
          title="Pagaments"
          icon={<ScheduleOutlined />}
          key="/pagaments"
          path="/pagaments"
        />
      </MainMenuItemGroup>
    </Menu>
  );
};

export default MainMenu;
