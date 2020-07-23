import React, { PropsWithChildren } from "react";
import { BorderlessButton } from "../../standalone/borderless-button";
import { ModalButton } from "../modal-button";
import { ModalButtonBaseProps } from "../modal-button/modal-button";
import { SearchList } from "../search-list";
import { SearchListProps } from "../search-list/search-list";
import "./modal-list.css";

interface ModalListProps<T> extends ModalButtonBaseProps, SearchListProps<T> {
  buttonIcon?: React.ReactElement;
}

const ModalList = <T,>({
  title,
  searchPlaceholder = "Cerca",
  dataSource,
  mapData,
  loading = false,
  searchFilters,
  wrapClassName = "modal-list",
  buttonIcon,
  button = <BorderlessButton shape="circle" icon={buttonIcon} />,
  renderItem,
  ...rest
}: PropsWithChildren<ModalListProps<T>>) => (
  <ModalButton
    title={title}
    button={button}
    footer={null}
    wrapClassName={wrapClassName}
    renderModalBody={([visible, setVisible]) => (
      <SearchList
        searchPlaceholder={searchPlaceholder}
        dataSource={dataSource}
        mapData={mapData}
        loading={loading}
        searchFilters={searchFilters}
        checkToFocus={visible}
        renderItem={(item: T, index) => renderItem(item, index, setVisible)}
      />
    )}
    {...rest}
  />
);

export default ModalList;
