import { Input, List } from "antd";
import React, {
  createRef,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { searchFilter } from "../../utils";
import { SearchFilters } from "../../utils/search-filter";
import "./search-list.css";

const { Search } = Input;

export interface SearchListBaseProps {
  loading?: boolean;
}

export interface SearchListProps<T> extends SearchListBaseProps {
  searchPlaceholder: string;
  dataSource: T[];
  mapData?: (data: T[]) => any[];
  searchFilters: (item: T) => SearchFilters;
  checkToFocus?: boolean;
  renderItem?: (
    item: T,
    index: number,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
  ) => React.ReactNode;
}

const SearchList = <T,>({
  searchPlaceholder,
  dataSource,
  mapData,
  loading = false,
  searchFilters,
  checkToFocus = true,
  renderItem,
}: PropsWithChildren<SearchListProps<T>>) => {
  const [searchValue, setSearchValue] = useState("");

  const searchRef: React.RefObject<Input> = createRef();

  useEffect(() => {
    setTimeout(() => {
      if (checkToFocus && searchRef.current) searchRef.current.focus();
    }, 1);
  }, [checkToFocus, searchRef]);

  const filteredData = useMemo(
    () =>
      searchValue.length > 0
        ? dataSource.filter((item) =>
            searchFilter(searchValue, searchFilters(item))
          )
        : dataSource,
    [dataSource, searchFilters, searchValue]
  );

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
        dataSource={mapData ? mapData(filteredData) : filteredData}
        loading={loading}
        size="small"
        split={false}
        locale={{ emptyText: "No s’ha trobat cap ítem" }}
        // TODO: renderItem(item, index, [setVisible])
        // @ts-ignore
        renderItem={renderItem}
        style={{ borderTop: "1px solid var(--background-color)" }}
      />
    </>
  );
};

export default SearchList;
