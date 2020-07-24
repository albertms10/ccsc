import { Input, Tabs } from "antd";
import React, { useState } from "react";
import { LlistaProjectes } from "../llista-projectes";

const { Search } = Input;
const { TabPane } = Tabs;

const SearchProjectesTabs: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="llista-projectes">
      <Search
        placeholder="Cerca projectes"
        size="large"
        value={searchValue}
        onChange={({ target }) => setSearchValue(target.value)}
        allowClear
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <Tabs>
        <TabPane tab="Actius" key="projectes-actius">
          <LlistaProjectes searchValue={searchValue} />
        </TabPane>
        <TabPane tab="Inactius" key="projectes-inactius">
          <LlistaProjectes searchValue={searchValue} inactius />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default SearchProjectesTabs;
