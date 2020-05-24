import { AutoComplete, Input } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import "./search-complete.css";

const { Search } = Input;

const SearchComplete = ({ data, filter, optionRenderObject, onSelect }) => {
  const [options, setOptions] = useState([]);

  const searchOption = (value) =>
    data.filter((option) => filter(value, option)).map(optionRenderObject);

  const handleSearch = (value) => setOptions(value ? searchOption(value) : []);

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

SearchComplete.propTypes = {
  data: PropTypes.array.isRequired,
  filter: PropTypes.func.isRequired,
  optionRenderObject: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
};

export default SearchComplete;
