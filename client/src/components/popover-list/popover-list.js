import { Checkbox, Input, List, Popover } from "antd";
import PropTypes from "prop-types";
import React, { useMemo, useState } from "react";
import { eventSearchFilter } from "../../utils";
import Authorized from "../authorized/authorized";
import { PopoverListCheckbox } from "./components/popover-list-checkbox";
import "./popover-list.css";

const { Search } = Input;

const PopoverList = ({
  action,
  title,
  dataSource = [],
  searchFilters,
  defaultValue,
  searchPlaceholder,
  loading = false,
  onChange,
  needsAuthorization = false,
  elseElement,
}) => {
  const [visible, setVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const popover = useMemo(
    () => (
      <Popover
        title={title}
        visible={visible}
        trigger="click"
        placement="bottomLeft"
        onVisibleChange={setVisible}
        content={
          <div className="popover-list">
            <Search
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={({ target }) => setSearchValue(target.value)}
              allowClear
              style={{ marginBottom: ".5rem" }}
            />
            <Checkbox.Group
              defaultValue={defaultValue}
              style={{ width: "100%", display: "block" }}
            >
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
                renderItem={({ value, label }) => (
                  <PopoverListCheckbox
                    value={value}
                    label={label}
                    onChange={onChange}
                  />
                )}
              />
            </Checkbox.Group>
          </div>
        }
      >
        {action}
      </Popover>
    ),
    [
      action,
      dataSource,
      searchFilters,
      defaultValue,
      loading,
      onChange,
      searchPlaceholder,
      searchValue,
      title,
      visible,
    ]
  );

  return needsAuthorization ? (
    <Authorized elseElement={elseElement}>{popover}</Authorized>
  ) : (
    popover
  );
};

PopoverList.propTypes = {
  action: PropTypes.node,
  title: PropTypes.string,
  dataSource: PropTypes.array,
  searchFilters: PropTypes.func,
  defaultValue: PropTypes.array,
  searchPlaceholder: PropTypes.string,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  needsAuthorization: PropTypes.bool,
  elseElement: PropTypes.node,
};

export default PopoverList;
