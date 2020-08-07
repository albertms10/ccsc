import { Input, Tabs } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LlistaAssajos } from "../llista-assajos";

const { Search } = Input;
const { TabPane } = Tabs;

interface SearchAssajosTabsProps {
  idProjecte?: number;
}

const SearchAssajosTabs: React.FC<SearchAssajosTabsProps> = ({
  idProjecte,
}) => {
  const { t } = useTranslation("actions");

  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <Search
        placeholder={t("search rehearsals")}
        size="large"
        value={searchValue}
        onChange={({ target }) => setSearchValue(target.value)}
        allowClear
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <Tabs>
        <TabPane tab={t("dashboard:upcoming")} key="assajos-propers">
          <LlistaAssajos searchValue={searchValue} idProjecte={idProjecte} />
        </TabPane>
        <TabPane tab={t("dashboard:previous")} key="assajos-anteriors">
          <LlistaAssajos
            searchValue={searchValue}
            idProjecte={idProjecte}
            anteriors
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default SearchAssajosTabs;
