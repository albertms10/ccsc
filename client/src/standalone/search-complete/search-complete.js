import { AutoComplete, Input } from "antd";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import "./search-complete.css";

const { Search } = Input;

const SearchComplete = ({
  data,
  filter,
  loading,
  placeholder,
  optionRenderObject,
  onSelect,
  showAllResults,
}) => {
  const [options, setOptions] = useState([]);

  const searchOption = useCallback(
    (value) =>
      (!showAllResults && !value
        ? data
        : data.filter((option) => filter(value, option))
      ).map(optionRenderObject),
    [data, filter, optionRenderObject, showAllResults]
  );

  const handleSearch = useCallback((value) => setOptions(searchOption(value)), [
    searchOption,
  ]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

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
          loading={loading}
          placeholder={placeholder}
          allowClear
        />
      </AutoComplete>
    </div>
  );
};

SearchComplete.propTypes = {
  data: PropTypes.array.isRequired,
  filter: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  placeholder: PropTypes.string,
  optionRenderObject: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  showAllResults: PropTypes.bool,
};

SearchComplete.defaultProps = {
  loading: false,
  placeholder: "Cerca",
  showAllResults: false,
};

export default SearchComplete;
