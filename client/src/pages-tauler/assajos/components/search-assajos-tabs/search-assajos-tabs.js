import { Input, Tabs } from "antd";
import React, { useState } from "react";
import { LlistaAssajos } from "../llista-assajos";

const { Search } = Input;
const { TabPane } = Tabs;

export default () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <Search
        placeholder="Cerca assajos"
        size="large"
        value={searchValue}
        onChange={({ target }) => setSearchValue(target.value)}
        allowClear
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <Tabs>
        <TabPane tab="Propers" key="assajos-propers">
          <LlistaAssajos searchValue={searchValue} />
        </TabPane>
        <TabPane tab="Anteriors" key="assajos-anteriors">
          <LlistaAssajos searchValue={searchValue} anteriors />
        </TabPane>
      </Tabs>
    </>
  );
};
