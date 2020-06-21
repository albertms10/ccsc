import PropTypes from "prop-types";
import React from "react";
import { BorderlessButton } from "../../standalone/borderless-button";
import { ModalButton } from "../modal-button";
import { SearchList } from "../search-list";
import "./modal-list.css";

const ModalList = ({
  title,
  searchPlaceholder = "Cerca",
  dataSource,
  loading = false,
  searchFilters,
  buttonIcon,
  renderItem,
}) => (
  <ModalButton
    title={title}
    button={<BorderlessButton shape="circle" icon={buttonIcon} />}
    footer={null}
    wrapClassName="modal-list"
    renderModalBody={([visible, setVisible]) => (
      <SearchList
        searchPlaceholder={searchPlaceholder}
        dataSource={dataSource}
        loading={loading}
        searchFilters={searchFilters}
        checkToFocus={visible}
        renderItem={(item) => renderItem(item, setVisible)}
      />
    )}
  />
);

ModalList.propTypes = {
  title: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  searchFilters: PropTypes.func,
  buttonIcon: PropTypes.node,
  renderItem: PropTypes.func,
};

export default ModalList;
