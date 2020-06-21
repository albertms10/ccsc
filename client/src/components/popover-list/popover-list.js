import { Checkbox, Popover } from "antd";
import PropTypes from "prop-types";
import React, { useMemo, useState } from "react";
import Authorized from "../authorized/authorized";
import { SearchList } from "../search-list";
import { PopoverListCheckbox } from "./components/popover-list-checkbox";
import "./popover-list.css";

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

  const popover = useMemo(
    () => (
      <Popover
        title={title}
        visible={visible}
        trigger="click"
        placement="bottomRight"
        overlayClassName="popover-list"
        onVisibleChange={setVisible}
        content={
          <Checkbox.Group
            defaultValue={defaultValue}
            style={{ width: "100%", display: "block" }}
          >
            <SearchList
              searchPlaceholder={searchPlaceholder}
              dataSource={dataSource}
              loading={loading}
              searchFilters={searchFilters}
              checkToFocus={visible}
              renderItem={({ value, label }) => (
                <PopoverListCheckbox
                  value={value}
                  label={label}
                  onChange={onChange}
                />
              )}
            />
          </Checkbox.Group>
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
