import React, { useState } from "react";
import moment from "moment";
import { AutoComplete, Input, Space } from "antd";
import { CalendarAvatar } from "../calendar-avatar";

import "./search-complete.css";
import { StatusBadge } from "../status-badge";

const { Search } = Input;

export default ({ data, onSelect }) => {
  const [options, setOptions] = useState([]);

  const searchResult = (value) =>
    data
      .filter((option) =>
        option.titol.toLowerCase().includes(value.toLowerCase())
      )
      .map((option) => ({
        // TODO Com gestiono el fet que les dades rebudes tinguing
        //  noms diferents que les que demanen els components?
        key: option.id_esdeveniment,
        value: option.titol,
        date: option.dia_inici,
        label: (
          <div className="search-complete-item">
            <Space>
              <StatusBadge
                tooltip={option.estat_esdeveniment}
                statusId={option.id_estat_esdeveniment}
                esAniversari={option.tipus === "aniversari"}
              />
              <CalendarAvatar moment={moment(option.dia_inici)} noBorder />
              <span>{option.titol}</span>
            </Space>
            <Space>
              <span className="search-complete-item-extra">
                {option.hora_inici
                  ? moment(option.data_inici).format("LT")
                  : ""}
              </span>
            </Space>
          </div>
        ),
      }));

  const handleSearch = (value) => {
    setOptions(value ? searchResult(value) : []);
  };

  return (
    <div className="search-complete">
      <AutoComplete
        options={options}
        onSelect={onSelect}
        onSearch={handleSearch}
      >
        <Search
          className="search-complete-input"
          size="large"
          placeholder="Cerca esdeveniments"
          allowClear
        />
      </AutoComplete>
    </div>
  );
};
