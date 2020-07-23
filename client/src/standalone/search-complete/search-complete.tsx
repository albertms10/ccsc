import { AutoComplete, Input } from "antd";
import { OptionProps } from "antd/lib/select";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import "./search-complete.css";

const { Search } = Input;

export interface SearchCompleteBaseProps {
  onSelect: (value: string, option: any) => Promise<any>;
}

interface SearchCompleteProps<T> extends SearchCompleteBaseProps {
  data: T[];
  filter: (value: string, option: T) => boolean;
  loading?: boolean;
  placeholder?: string;
  optionRenderObject: (value: T, index: number, array: any[]) => any;
  showAllResults?: boolean;
}

const SearchComplete = <T,>({
  data,
  filter,
  loading = false,
  placeholder = "Cerca",
  optionRenderObject,
  onSelect,
  showAllResults = false,
}: PropsWithChildren<SearchCompleteProps<T>>) => {
  const [options, setOptions] = useState<OptionProps[]>([]);

  const searchOption = useCallback(
    (value: string): OptionProps[] =>
      (!showAllResults && !value
        ? data
        : data.filter((option) => filter(value, option))
      ).map(optionRenderObject),
    [data, filter, optionRenderObject, showAllResults]
  );

  const handleSearch = useCallback(
    (value: string) => setOptions(searchOption(value)),
    [searchOption]
  );

  useEffect(() => {
    handleSearch("");
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

export default SearchComplete;
