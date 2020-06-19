import { Modal } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { BorderlessButton } from "../../standalone/borderless-button";
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
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <BorderlessButton icon={buttonIcon} onClick={() => setVisible(true)} />
      <Modal
        title={title}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        wrapClassName="modal-list"
      >
        <SearchList
          searchPlaceholder={searchPlaceholder}
          dataSource={dataSource}
          loading={loading}
          searchFilters={searchFilters}
          checkToFocus={visible}
          renderItem={(item) => renderItem(item, setVisible)}
        />
      </Modal>
    </>
  );
};

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
