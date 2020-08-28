import { AutoComplete, Input } from "antd";
import { OptionData, OptionGroupData } from "rc-select/lib/interface";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import "./search-complete.css";
import { useTranslation } from "react-i18next";

const { Search } = Input;

export interface SearchCompleteBaseProps {
  onSelect: (
    value: string,
    option: OptionData | OptionGroupData
  ) => Promise<void | Response>;
}

interface SearchCompleteProps<T> extends SearchCompleteBaseProps {
  data: T[];
  filter: (value: string, option: T) => boolean;
  loading?: boolean;
  placeholder?: string;
  optionRenderObject: <U>(
    value: T,
    index: number,
    array: U[]
  ) => OptionData | OptionGroupData;
  showAllResults?: boolean;
}

const SearchComplete = <T,>({
  data,
  filter,
  loading = false,
  placeholder,
  optionRenderObject,
  onSelect,
  showAllResults = false,
}: PropsWithChildren<SearchCompleteProps<T>>): JSX.Element => {
  const { t } = useTranslation();

  const [options, setOptions] = useState<(OptionData | OptionGroupData)[]>([]);

  const searchOption = useCallback(
    (value: string) =>
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
          placeholder={placeholder || t("search")}
          allowClear
        />
      </AutoComplete>
    </div>
  );
};

export default SearchComplete;
