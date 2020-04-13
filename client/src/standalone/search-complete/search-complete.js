import React, { useState } from 'react';
import moment from 'moment';
import { AutoComplete, Input } from 'antd';

const { Search } = Input;

export default ({ data, onSelect }) => {
  const [options, setOptions] = useState([]);

  const searchResult = (value) =>
    data
      .filter((option) =>
        option.titol.toLowerCase().includes(value.toLowerCase())
      )
      .map((option) => ({
        key: option.id_esdeveniment,
        value: option.titol,
        date: option.dia_inici,
        label: (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {option.titol}
            <span>{`${moment(option.data_inici).format("L")} ${
              option.hora_inici ? moment(option.data_inici).format("LT") : ""
            }`}</span>
          </div>
        ),
      }));

  const handleSearch = (value) => {
    setOptions(value ? searchResult(value) : []);
  };

  return (
    <AutoComplete options={options} onSelect={onSelect} onSearch={handleSearch}>
      <Search
        size="large"
        placeholder="Cerca esdeveniments"
        style={{ width: 400, height: 40 }}
      />
    </AutoComplete>
  );
};
