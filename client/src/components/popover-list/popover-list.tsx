import { Checkbox, Popover } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { TooltipPlacement } from "antd/lib/tooltip";
import React, { PropsWithChildren, useState } from "react";
import { ConditionalWrapper } from "../../standalone/conditional-wrapper";
import { Authorized } from "../authorized";
import { SearchList } from "../search-list";
import { SearchListProps } from "../search-list";
import { PopoverListCheckbox } from "./components/popover-list-checkbox";
import { PopoverListCheckboxBaseProps } from "./components/popover-list-checkbox";
import "./popover-list.css";

interface CheckboxItem {
  value: string;
  label: string;
}

interface PopoverListProps<T extends CheckboxItem>
  extends PopoverListCheckboxBaseProps,
    SearchListProps<T> {
  action: React.ReactElement;
  title: string;
  placement?: TooltipPlacement;
  defaultValue: CheckboxValueType[];
  needsAuthorization?: boolean;
  elseElement?: React.ReactNode;
}

const PopoverList = <T extends CheckboxItem>({
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
}: PropsWithChildren<PopoverListProps<T>>) => {
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
            <SearchList<T>
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

export default PopoverList;
