import { Input, List } from "antd";
import PropTypes from "prop-types";
import React, { createRef, useEffect, useState } from "react";
import { eventSearchFilter } from "../../utils";

const { Search } = Input;

const SearchList = ({
  searchPlaceholder,
  dataSource,
  loading,
  searchFilters,
  checkToFocus = true,
  renderItem,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const searchRef = createRef();

  useEffect(() => {
    setTimeout(() => {
      if (checkToFocus && searchRef.current) searchRef.current.focus();
    }, 1);
  }, [checkToFocus, searchRef]);

  return (
    <>
      <Search
        ref={searchRef}
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={({ target }) => setSearchValue(target.value)}
        allowClear
        style={{ marginBottom: ".5rem" }}
      />
      <List
        dataSource={
          searchValue.length > 0
            ? dataSource.filter((item) =>
                eventSearchFilter(searchValue, searchFilters(item))
              )
            : dataSource
        }
        loading={loading}
        size="small"
        split={false}
        locale={{ emptyText: "No s’ha trobat cap ítem" }}
        renderItem={renderItem}
        style={{ borderTop: "1px solid var(--background-color)" }}
      />
    </>
  );
};

SearchList.propTypes = {
  searchPlaceholder: PropTypes.string,
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  searchFilters: PropTypes.func,
  checkToFocus: PropTypes.bool,
  renderItem: PropTypes.func,
};

export default SearchList;
