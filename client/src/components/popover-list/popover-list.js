import { Checkbox, Popover } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { ConditionalWrapper } from "../../standalone/conditional-wrapper";
import { Authorized } from "../authorized";
import { SearchList } from "../search-list";
import { PopoverListCheckbox } from "./components/popover-list-checkbox";
import "./popover-list.css";

const PopoverList = ({
  action,
  title,
  placement = "bottomRight",
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

  return (
    <ConditionalWrapper
      condition={needsAuthorization}
      wrapper={(children) => (
        <Authorized elseElement={elseElement}>{children}</Authorized>
      )}
    >
      <Popover
        title={title}
        visible={visible}
        trigger="click"
        placement={placement}
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
    </ConditionalWrapper>
  );
};

PopoverList.propTypes = {
  action: PropTypes.node,
  title: PropTypes.string,
  placement: PropTypes.string,
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
