import { ModalButton, ModalButtonBaseProps } from "components/modal-button";
import { SearchList, SearchListProps } from "components/search-list";
import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { BorderlessButton } from "standalone/borderless-button";
import "./modal-list.css";

export interface ModalListProps<T>
  extends ModalButtonBaseProps,
    SearchListProps<T> {
  buttonIcon?: React.ReactNode;
}

const ModalList = <T,>({
  title,
  searchPlaceholder,
  dataSource,
  mapData,
  loading = false,
  searchFilters,
  wrapClassName = "modal-list",
  buttonIcon,
  button = <BorderlessButton shape="circle" icon={buttonIcon} />,
  renderItem,
  ...rest
}: PropsWithChildren<ModalListProps<T>>): JSX.Element => {
  const { t } = useTranslation("common");

  return (
    <ModalButton
      title={title}
      button={button}
      footer={null}
      wrapClassName={wrapClassName}
      renderModalBody={([visible, setVisible]) => (
        <SearchList
          searchPlaceholder={searchPlaceholder || t("search")}
          dataSource={dataSource}
          mapData={mapData}
          loading={loading}
          searchFilters={searchFilters}
          checkToFocus={visible}
          // TODO: renderItem(item, index, [setVisible])
          // @ts-ignore
          renderItem={(item, index) => renderItem(item, index, setVisible)}
        />
      )}
      {...rest}
    />
  );
};
export default ModalList;
