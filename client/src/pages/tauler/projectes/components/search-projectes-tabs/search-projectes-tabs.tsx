import { Input, Tabs } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LlistaProjectes } from "../llista-projectes";

const { Search } = Input;
const { TabPane } = Tabs;

const SearchProjectesTabs: React.FC = () => {
  const { t } = useTranslation("actions");

  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="llista-projectes">
      <Search
        placeholder={t("search projects")}
        size="large"
        value={searchValue}
        onChange={({ target }) => setSearchValue(target.value)}
        allowClear
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <Tabs>
        <TabPane tab={t("common:active")} key="projectes-actius">
          <LlistaProjectes searchValue={searchValue} />
        </TabPane>
        <TabPane tab={t("common:inactive")} key="projectes-inactius">
          <LlistaProjectes searchValue={searchValue} inactius />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default SearchProjectesTabs;
